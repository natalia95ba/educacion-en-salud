const collections = { F: "sesiones_fuerza", R: "sesiones_resistencia", M: "sesiones_combinadas" };
const prefixes = { fuerza: "F", resistencia: "R", combinado: "M" };
export const cardioEquipment = ["bicicleta", "remo", "skierg", "eliptica"];

function weeklyOrder(library, { objetivo, dias, prioridad }) {
  if (objetivo === "combinado") {
    if (dias === 3 && prioridad === "resistencia") return ["R_A", "F_A", "R_B"];
    if (dias === 4 && prioridad === "fuerza") return ["F_A", "R_A", "F_B", "F_C"];
    if (dias === 4 && prioridad === "resistencia") return ["R_A", "F_A", "R_B", "R_C"];
  }
  return library.distribuciones[objetivo]?.[dias];
}

function resolveExercise(library, id, { nivel, lugar, material }) {
  const exercise = library.ejercicios[id];
  if (!exercise) return null;
  if (lugar !== "casa") return id;

  const fits = (candidate) => {
    const variant = library.ejercicios[candidate];
    return variant?.lugares.includes("casa") && variant.material_obligatorio.every((entry) => material.includes(entry));
  };
  for (const item of ["mancuernas", "kettlebell", "mochila", "bandas"]) {
    const candidate = library.reglas.seleccion_por_material[item]?.[exercise.patron];
    if (material.includes(item) && candidate && fits(candidate)) return candidate;
  }
  if (fits(id)) return id;
  const candidate = library.reglas.variantes_por_patron.casa[exercise.patron]?.[library.parametros.niveles.indexOf(nivel)];
  return fits(candidate) ? candidate : null;
}

function resolveStrength(library, items, preferences, mixed, express = false) {
  return items.map((item) => ({
    ...item,
    ejercicio_id: resolveExercise(library, item.ejercicio_id, preferences),
    series: !express && preferences.experiencia === "paron"
      ? (mixed ? 1 : Math.max(1, item.series - 1)) : item.series,
  }));
}

function resolveSession(library, reference, p) {
  const [type, letter] = reference.split("_");
  const scope = type === "F" ? p.lugar : type === "R" ? p.modalidad : `${p.lugar}_${p.modalidad}`;
  const template = library[collections[type]]?.[`${type}_${p.nivel}_${scope}_${letter}`];
  if (!template) return null;

  if (type === "F") return { ...template, parte_principal: resolveStrength(library, template.parte_principal, p, false) };
  if (type === "M") return { ...template, fuerza: resolveStrength(library, template.fuerza, p, true) };
  if (p.modalidad === "carrera" && (p.experiencia === "paron" || p.carreraReciente === false)) {
    return {
      ...template,
      parte_principal: {
        formato: "caminar_correr", repeticiones: 6, trabajo_seg: 60, recuperacion_seg: 180,
        rpe_trabajo: [3, 4], nota: "Caminar en recuperación; si trotar no es tolerable, caminar todo el bloque.",
      },
      duracion_estimada_min: template.calentamiento.min + 24 + template.vuelta_calma.min,
    };
  }
  return template;
}

function expressFor(library, session, p) {
  const type = prefixes[session.objetivo];
  const suffix = type === "R" ? p.modalidad : `${p.lugar}_${session.letra}`;
  const template = library.sesiones_expres[`X_${type}_${p.nivel}_${suffix}`];
  if (!template || template.duracion_total_min !== 20) return null;
  const main = template.parte_principal;
  if (type === "F") return { ...template, parte_principal: { ...main, ejercicios: resolveStrength(library, main.ejercicios, p, false, true) } };
  if (type === "M") return { ...template, modalidad: p.modalidad, parte_principal: { ...main, fuerza: resolveStrength(library, main.fuerza, p, true, true) } };
  return template;
}

export function strengthItems(session) {
  const main = session.parte_principal;
  return Array.isArray(main) ? main : session.fuerza ?? main?.ejercicios ?? main?.fuerza ?? [];
}

export function planWorkout(library, preferences, confirmedGym = []) {
  const { objetivo, dias, nivel, lugar, modalidad, experiencia, prioridad, limitacion, alerta } = preferences;
  if (alerta === true || (limitacion && limitacion !== "ninguna")) return { status: "review" };
  const p = library.parametros;
  const hasStrength = objetivo !== "resistencia";
  const hasCardio = objetivo !== "fuerza";
  const material = preferences.material ?? [];
  if (!p.objetivos.includes(objetivo) || !p.dias.includes(dias) || !p.niveles.includes(nivel) ||
      !p.experiencia.includes(experiencia) || !p.prioridades[objetivo]?.includes(prioridad) ||
      alerta !== false || limitacion !== "ninguna" ||
      (hasStrength && !p.lugares.includes(lugar)) || (hasCardio && !p.modalidades.includes(modalidad)) ||
      (hasStrength && lugar === "casa" && (!material.length || material.some((item) => !p.material_casa.includes(item)) ||
        (material.includes("ninguno") && material.length !== 1)))) return { status: "invalid" };
  if (hasCardio && cardioEquipment.includes(modalidad) && !preferences.equipoCardio) return { status: "cardio-equipment" };
  if (hasCardio && modalidad === "carrera" && typeof preferences.carreraReciente !== "boolean") return { status: "invalid" };

  const order = weeklyOrder(library, preferences);
  const templates = order?.map((entry) => resolveSession(library, entry, { ...preferences, material }));
  if (templates?.length !== dias || templates.some((entry) => !entry)) return { status: "missing" };
  const compatible = (session) => strengthItems(session).every(({ ejercicio_id: id }) => {
    const exercise = library.ejercicios[id];
    return exercise?.lugares.includes(lugar) && (lugar !== "casa" || exercise.material_obligatorio.every((item) => material.includes(item)));
  });
  if (!templates.every(compatible)) return { status: "missing" };
  const needsRunningAdaptation = modalidad === "carrera" && (experiencia === "paron" || preferences.carreraReciente === false);
  if (needsRunningAdaptation && templates.some((session) =>
    session.objetivo === "combinado" && session.cardio.formato !== "caminar_correr")) return { status: "running" };

  const sessions = templates.map((session) => {
    const alternative = needsRunningAdaptation ? null : expressFor(library, session, { ...preferences, material });
    return { session, express: alternative && compatible(alternative) ? alternative : null };
  });
  const required = [...new Set(sessions.flatMap(({ session, express }) =>
    [...strengthItems(session), ...(express ? strengthItems(express) : [])].map(({ ejercicio_id }) => ejercicio_id)
  ))].filter((id) => library.ejercicios[id].material_obligatorio.length);
  if (hasStrength && lugar === "gimnasio" && required.some((id) => !confirmedGym.includes(id))) {
    return { status: "gym-equipment", required };
  }
  return { status: "ok", sessions, version: library.version, weeks: library.reglas.progresion.horizonte_semanas };
}
