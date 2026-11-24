const weekly = {
  bienestar: ["M", "MM", "MFC", "MFCM"],
  hipertrofia: ["M", "FF", "FFF", "FFFF"],
  cardio: ["M", "MM", "MFC", "FCFC"],
  general: ["M", "MM", "MFC", "FCFC"],
};

const strengthPatterns = {
  full: ["sentadilla", "bisagra", "empuje", "traccion", "core", "unilateral"],
  upper: ["empuje", "traccion", "empuje_vertical", "traccion", "core", "empuje"],
  lower: ["sentadilla", "bisagra", "unilateral", "pantorrilla", "core", "bisagra"],
};

const priorities = ["sentadilla", "bisagra", "empuje", "traccion"];
const load = { gimnasio: 4, barra_discos: 3, mancuernas: 3, kettlebell: 3, bandas: 2, trx: 2, banco: 1 };
const leg = new Set(["sentadilla", "bisagra", "unilateral", "pantorrilla"]);
const limitedPull = new Set(["remo_isometrico_autorresistencia", "tiron_isometrico_toalla"]);
const levelSettings = {
  principiante: { rpe: 6.5, maxSets: 3, target: [4, 8] },
  intermedio: { rpe: 7.5, maxSets: 4, target: [6, 12] },
  avanzado: { rpe: 8, maxSets: 4, target: [8, 16] },
};
export const volumeWeights = Object.freeze({ primary: 1, secondary: .5 });
const runningLevels = ["todavia_no", "menos_5", "5_10", "10_20", "mas_20"];
const gymEquipment = ["gimnasio", "mancuernas", "bandas", "kettlebell", "barra_discos", "banco", "trx"];

/** @typedef {{objetivo:string,dias:number,nivel:string,lugar:string,material:string[],contraindicacion:string}} Questionnaire */

export function indexLibrary(library, templates) {
  const index = new Map();
  for (const exercise of library.ejercicios) {
    if (!exercise.id || index.has(exercise.id) || !exercise.patron || !exercise.musculo_principal ||
        !Array.isArray(exercise.lugares) || !Array.isArray(exercise.material_obligatorio) ||
        exercise.rango_reps_referencia?.length !== 2 ||
        !exercise.rango_reps_referencia.every((value) => Number.isFinite(value) && value > 0)) {
      throw new Error("Catálogo de ejercicios inválido");
    }
    index.set(exercise.id, exercise);
  }
  const archetypes = new Map(templates.arquetipos.map((item) => [item.id, item]));
  if (archetypes.size !== templates.arquetipos.length ||
      ["F_FULL_BODY", "F_UPPER", "F_LOWER", "C_CONTINUO", "C_INTERVALOS", "C_CACO",
        "M_FUERZA_PRIORITARIA", "M_CARDIO_PRIORITARIO", "X_FUERZA", "X_CARDIO", "X_MIXTA"]
        .some((id) => !archetypes.has(id))) throw new Error("Arquetipos inválidos");
  return { ...library, index, archetypes };
}

function eligible(exercise, q, confirmedGym) {
  return exercise.lugares.includes(q.lugar) &&
    exercise.material_obligatorio.every((item) => q.lugar === "casa" ? q.material.includes(item) :
      gymEquipment.includes(item) && confirmedGym.includes(exercise.id));
}

function choose(catalog, pattern, q, gym, used, preferred, previewGym) {
  const candidates = catalog.ejercicios.filter((ex) => ex.patron === pattern && !used.has(ex.id) &&
    (q.nivel !== "principiante" || ex.dificultad_tecnica <= 2) &&
    (previewGym ? ex.lugares.includes("gimnasio") && ex.material_obligatorio.every((item) => gymEquipment.includes(item)) : eligible(ex, q, gym)));
  const score = (e) => e.material_obligatorio.reduce((sum, item) => sum + (load[item] ?? 0), 0) * 4 -
    e.dificultad_tecnica - (limitedPull.has(e.id) ? 12 : 0);
  return candidates.find((e) => e.id === preferred) ?? candidates.sort((a, b) => score(b) - score(a))[0];
}

function prescription(ex, settings, main, express, goal) {
  const unit = ex.id === "farmer_carry" || /distancia en metros/i.test(ex.instruccion_breve) ? "metros" :
    ex.id.startsWith("plancha") || ex.id.includes("isometrico") ? "segundos" : "repeticiones";
  const perSide = ex.patron === "unilateral" || /\bpor (lado|pierna|brazo)\b/i.test(ex.instruccion_breve) ||
    ["remo_mancuerna", "remo_banco_mancuerna", "remo_kb", "plancha_lateral", "dead_bug", "pallof"].includes(ex.id);
  return { id: ex.id, name: ex.nombre, pattern: ex.patron, primary: ex.musculo_principal,
    secondary: ex.musculo_secundario, equipment: ex.material_obligatorio, instruction: ex.instruccion_breve,
    range: ex.rango_reps_referencia, unit, perSide, main, series: express ? 2 : main && goal === "hipertrofia" ? 3 : 2,
    rpe: express ? Math.min(settings.rpe, 7) : settings.rpe, rest: main ? 120 : 75 };
}

function cardioBlock(catalog, selection, q, type, express, index) {
  let mode = selection.mode;
  const capacity = runningLevels.indexOf(selection.capacity);
  if (!catalog.parametros.modalidades.includes(mode)) return null;
  if (mode === "bicicleta" && selection.bike !== true) return null;
  if ((mode === "correr" || mode === "caco") && capacity < 0) return null;
  if (mode === "correr" && capacity < 3) mode = "caco";
  if (mode === "caco") {
    const offset = [-1, 0, 1].includes(selection.offset) ? selection.offset : 0;
    const stages = catalog.cardio.caco_etapas;
    const stage = stages[Math.max(0, Math.min(stages.length - 1, [0, 0, 1, 2, 3][capacity] + offset))];
    return { mode, stage: stage.id, repetitions: express ? Math.min(4, stage.repeticiones) : stage.repeticiones,
      work: stage.correr_seg, rest: stage.caminar_seg, rpe: "3–5", recoveryRpe: "2–3" };
  }
  const minutes = type === "M" ? (express ? 8 : q.objetivo === "hipertrofia" ? 13 : 20) :
    express ? 15 : q.objetivo === "cardio" ? 38 : 32;
  if (!express && type === "C" && index > 0 && index % 2 === 1 && q.nivel !== "principiante" && mode !== "caminar") {
    return { mode, repetitions: Math.floor(minutes / 5), work: 180, rest: 120, rpe: "6–7", recoveryRpe: "2–3" };
  }
  return { mode, minutes, rpe: express || q.nivel === "principiante" ? "3–5" : "4–5" };
}

function workSeconds(item) {
  const middle = (item.range[0] + item.range[1]) / 2;
  return middle * (item.unit === "repeticiones" ? 3 : item.unit === "metros" ? 1.25 : 1) * (item.perSide ? 2 : 1);
}

export function estimate(session) {
  const blocks = session.blocks.reduce((total, block) => {
    if (block.seconds) return total + block.seconds + 30 * block.items.length;
    const transitions = 30 * block.items.length;
    if (block.format === "series") {
      return total + transitions + block.items.reduce((sum, item) =>
        sum + item.series * workSeconds(item) + (item.series - 1) * item.rest, 0);
    }
    return total + transitions + block.rounds * (block.items.reduce((sum, item) =>
      sum + (block.station ?? workSeconds(item)), 0) + 15 * (block.items.length - 1)) + (block.rounds - 1) * block.rest;
  }, 0);
  const cardio = session.cardio;
  const cardioSeconds = cardio ? (cardio.minutes ? cardio.minutes * 60 : cardio.repetitions * (cardio.work + cardio.rest)) : 0;
  return Math.round((session.warmup.reduce((sum, step) => sum + step.seconds, 0) +
    blocks + cardioSeconds + session.cooldown + (blocks && cardio ? 120 : 0)) / 6) / 10;
}

function accessoryBlock(items, type, q, express, index) {
  if (items.length !== 2 || items[0].primary === items[1].primary ||
      items[0].secondary === items[1].primary || items[1].secondary === items[0].primary ||
      q.nivel === "principiante" || !items.every((item) => item.equipment.length === 0)) return { format: "series", items };
  const copies = items.map((item) => ({ ...item, series: 2, rpe: Math.min(item.rpe, 7) }));
  if (q.objetivo === "hipertrofia") return { format: "superserie", items: copies, rounds: 2, rest: 90 };
  if (!express && q.objetivo === "general" && q.nivel === "avanzado" && type === "F") {
    const timed = copies.map((item) => ({ ...item, range: [item.range[0], item.range[0]], rpe: 6.5 }));
    if (timed.every((item) => workSeconds(item) <= 40)) {
      return { format: index < 2 ? "emom" : "amrap", items: timed, seconds: 240, rounds: 2, station: 60, rest: 0 };
    }
  }
  if (!express) {
    const timedCircuit = index % 2 === 1 && copies.every((item) => workSeconds(item) <= 55);
    return { format: timedCircuit ? "circuito" : "rondas", items: copies, rounds: 2, rest: 90, ...(timedCircuit ? { station: 60 } : {}) };
  }
  return { format: "series", items };
}

function buildSession(catalog, q, type, index, gym, selection, old, express, previewGym) {
  const letter = "ABCD"[index];
  const level = levelSettings[q.nivel];
  const settings = q.objetivo === "bienestar" || (q.objetivo === "cardio" && type === "M")
    ? { ...level, rpe: Math.min(level.rpe, 7) } : level;
  const archetype = type === "C" ? "C_CONTINUO" : type === "M" ?
    (q.objetivo === "cardio" ? "M_CARDIO_PRIORITARIO" : "M_FUERZA_PRIORITARIA") :
    q.objetivo === "hipertrofia" && q.dias === 4 ? (index % 2 ? "F_UPPER" : "F_LOWER") : "F_FULL_BODY";
  const shortType = { F: "X_FUERZA", M: "X_MIXTA", C: "X_CARDIO" }[type];
  const template = catalog.archetypes.get(express ? shortType : archetype);
  const patterns = type === "C" ? [] : express ?
    (type === "M" ? ["sentadilla", q.objetivo === "cardio" && index % 2 ? "traccion" : "empuje"] :
      [archetype === "F_UPPER" ? "empuje_vertical" : "sentadilla", "empuje", "traccion", "core", "pantorrilla"]) :
    type === "M" ? [...template.patrones_prioritarios, ...(q.objetivo === "hipertrofia" ? ["core"] : [])] :
    type === "F" && q.objetivo === "general" && q.nivel === "avanzado" ?
      [...priorities, "core", "pantorrilla"] :
      strengthPatterns[archetype === "F_UPPER" ? "upper" : archetype === "F_LOWER" ? "lower" : "full"];
  const used = new Set();
  const items = [];
  for (const [slot, pattern] of patterns.entries()) {
    const favorite = old?.blocks.flatMap((block) => block.items).find((item) => item.main && item.pattern === pattern && !used.has(item.id));
    const ex = choose(catalog, pattern, q, gym, used, favorite?.id, previewGym);
    if (!ex) continue;
    used.add(ex.id);
    const main = slot < (type === "M" && express ? 2 : express ? 3 : 4);
    items.push(prescription(ex, settings, main, express, q.objetivo));
  }
  const main = items.filter((item) => item.main);
  const extras = items.filter((item) => !item.main);
  const cardio = type === "F" ? null : cardioBlock(catalog, selection, q, type, express, index);
  const warmup = type === "C" ? [{ text: "Empieza muy suave y aumenta gradualmente el ritmo", seconds: express ? 180 : 480 }] :
    [{ text: "Marcha y moviliza hombros y cadera suavemente", seconds: express ? 60 : 120 },
      { text: "Practica los primeros movimientos sin fatiga", seconds: express ? 120 : 120 },
      ...(!express ? [{ text: "Haz 1–2 series fáciles de aproximación al primer ejercicio", seconds: 180 }] : [])];
  const session = { letter, type, objective: template.objetivo, express, warmup, cardio, cooldown: express ? 120 : 180,
    blocks: [...(main.length ? [{ format: "series", items: main }] : []), ...(extras.length ? [accessoryBlock(extras, type, q, express, index)] : [])],
    warnings: [] };
  if (items.some((item) => limitedPull.has(item.id))) session.warnings.push(catalog.seguridad.traccion_sin_material);
  if (type !== "C" && items.length < (express ? 2 : 4)) session.warnings.push("El material disponible limita la cobertura de fuerza de esta sesión.");
  if (express) {
    while (estimate(session) > 22 && session.blocks.length > 1) session.blocks.pop();
    if (cardio?.minutes && estimate(session) > 22 && type === "M") cardio.minutes = Math.max(5, cardio.minutes - Math.ceil(estimate(session) - 22));
    if (cardio?.repetitions) while (estimate(session) > 22 && cardio.repetitions > 2) cardio.repetitions--;
    for (const item of main) if (estimate(session) > 22 && item.series > 1) item.series--;
  }
  session.minutes = estimate(session);
  return session;
}

export function weeklyVolume(sessions, weights = volumeWeights) {
  const muscles = {}, patterns = {};
  for (const session of sessions) for (const block of session.blocks) for (const item of block.items) {
    // A tolerance-based block can finish early, so its possible rounds do not count as guaranteed volume.
    const sets = block.format === "amrap" ? 0 : item.series;
    const add = (muscle, key) => {
      if (!muscle) return;
      const row = muscles[muscle] ??= { primary: 0, secondary: 0, equivalent: 0 };
      row[key] += sets;
      row.equivalent += sets * weights[key];
    };
    add(item.primary, "primary");
    if (item.secondary !== item.primary) add(item.secondary, "secondary");
    patterns[item.pattern] = (patterns[item.pattern] ?? 0) + sets;
  }
  return { muscles, patterns, hardCardio: sessions.filter((session) => session.cardio?.rpe === "6–7").length,
    legExposures: sessions.filter((session) => session.blocks.some((block) => block.items.some((item) => leg.has(item.pattern)))).length };
}

function rebalance(sessions, q, weights) {
  const settings = levelSettings[q.nivel], [min, max] = settings.target;
  const candidates = sessions.flatMap((session) => session.blocks.filter((block) => block.format === "series")
    .flatMap((block) => block.items.map((item) => ({ session, item }))));
  if (q.objetivo === "hipertrofia") {
    for (const { session, item } of [...candidates].reverse()) {
      while (item.series > 2 && [item.primary, item.secondary].some((muscle) => muscle &&
        weeklyVolume(sessions, weights).muscles[muscle].equivalent > max)) item.series--;
      session.minutes = estimate(session);
    }
  }
  for (const { session, item } of candidates) {
    const { muscles, patterns } = weeklyVolume(sessions, weights);
    const under = q.objetivo === "hipertrofia" ? muscles[item.primary].equivalent < min : (patterns[item.pattern] ?? 0) < 4;
    if (!item.main || !under || item.series >= settings.maxSets || estimate(session) >= 58 || limitedPull.has(item.id)) continue;
    if (q.objetivo === "hipertrofia" && (muscles[item.primary].equivalent + weights.primary > max ||
      (item.secondary && muscles[item.secondary]?.equivalent + weights.secondary > max))) continue;
    item.series++;
    if (estimate(session) > 70) item.series--;
    session.minutes = estimate(session);
  }
  for (let i = 0; i < sessions.length; i++) {
    const s = sessions[i];
    while (estimate(s) > 70 && s.blocks.length > 1 && s.blocks.at(-1).items.every((item) => !item.main)) s.blocks.pop();
    if (s.cardio?.rpe === "6–7" && (q.nivel === "principiante" || sessions.some((other, n) =>
      Math.abs(n - i) === 1 && other.blocks.some((b) => b.items.some((item) => leg.has(item.pattern) && item.rpe >= 7.5))))) {
      s.cardio.rpe = "4–5";
    }
    s.minutes = estimate(s);
    if (s.minutes < 50) s.warnings.push("Duración inferior a la referencia. La sesión conserva los bloques disponibles para tu objetivo.");
    if (s.minutes > 70) s.warnings.push("La estimación supera el intervalo habitual.");
  }
}

export function validateProgram(catalog, q, sessions, gym) {
  if (sessions.length !== q.dias || new Set(sessions.map((s) => s.letter)).size !== q.dias ||
      (q.dias >= 2 && sessions.filter((s) => s.blocks.length).length < 2)) return false;
  return sessions.every((s) => [s, s.short].filter(Boolean).every((variant) =>
    variant.minutes === estimate(variant) && variant.warmup.length > 0 && variant.cooldown > 0 &&
    (variant.type === "F" || variant.cardio) && (variant.type === "C" || variant.blocks.some((block) => block.items.length)) &&
    (!variant.express || (variant.minutes >= 15 && variant.minutes <= 25)) &&
    variant.blocks.every((block) => block.items.every((item) => catalog.index.has(item.id) &&
      eligible(catalog.index.get(item.id), q, gym) && item.series > 0 && item.rest >= 60))));
}

/** @param {Questionnaire} q */
export function generateProgram(catalog, q, { cardio = {}, gym = [], previous = null, weights = volumeWeights } = {}) {
  if (q.contraindicacion === "si" || q.contraindicacion === "duda") return { state: "review" };
  const p = catalog.parametros;
  if (q.contraindicacion !== "no" || !p.objetivos.includes(q.objetivo) || !p.dias.includes(q.dias) ||
      !p.niveles.includes(q.nivel) || !p.lugares.includes(q.lugar) ||
      (q.lugar === "casa" && (!Array.isArray(q.material) || !q.material.length ||
      q.material.some((v) => !p.material_casa.includes(v)) || (q.material.includes("ninguno") && q.material.length > 1)))) return { state: "invalid" };
  const selections = Array.from(weekly[q.objetivo][q.dias - 1], (type, i) => [type, cardio["ABCD"[i]] ?? { mode: "caminar" }]);
  const sessions = selections.map(([type, selected], index) => {
    const old = previous?.sessions.find((item) => item.letter === "ABCD"[index] && item.type === type);
    const full = buildSession(catalog, q, type, index, gym, selected, old, false, false);
    const short = buildSession(catalog, q, type, index, gym, selected, old?.short, true, false);
    return { ...full, short: short.minutes >= 15 && short.minutes <= 25 ? short : null };
  });
  rebalance(sessions, q, weights);
  if (!validateProgram(catalog, q, sessions, gym)) return { state: "unavailable" };
  const volume = weeklyVolume(sessions, weights);
  const warnings = [];
  if (q.objetivo === "hipertrofia" && Object.values(volume.muscles).some((item) =>
    item.equivalent < levelSettings[q.nivel].target[0] || item.equivalent > levelSettings[q.nivel].target[1])) {
    warnings.push("La dosis semanal de algunos grupos musculares queda fuera del intervalo orientativo para tu nivel y disponibilidad.");
  }
  if (priorities.some((pattern) => !volume.patterns[pattern])) warnings.push("El programa no cubre todos los patrones de fuerza con el material disponible.");
  return { state: "ready", libraryVersion: catalog.version, sessions, volume, warnings };
}

export function gymCandidates(catalog, q) {
  if (q.lugar !== "gimnasio" || q.contraindicacion !== "no") return [];
  return [...new Set(Array.from(weekly[q.objetivo][q.dias - 1], (type, index) =>
    [false, true].flatMap((express) => buildSession(catalog, q, type, index, [], { mode: "caminar" },
      null, express, true).blocks.flatMap((block) => block.items.filter((item) => item.equipment.length).map((item) => item.id)))).flat())];
}
