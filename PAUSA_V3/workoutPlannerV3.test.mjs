import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { estimate, generateProgram, gymCandidates, indexLibrary, weeklyVolume } from "../src/EnterprisePrivateZone/workoutPlannerV3.js";

const read = (file) => JSON.parse(readFileSync(new URL(file, import.meta.url), "utf8"));
const catalog = indexLibrary(read("./PAUSA_biblioteca_ejercicios_v3.json"), read("./PAUSA_plantillas_sesiones_v3.json"));
const p = catalog.parametros;
const base = { objetivo: "general", dias: 3, nivel: "intermedio", lugar: "casa", material: ["ninguno"], contraindicacion: "no" };
const allItems = (session) => session.blocks.flatMap((block) => block.items);

test("384 perfiles deterministas con alternativa exprés y material compatible", () => {
  let profiles = 0;
  const formats = new Set();
  for (const objetivo of p.objetivos) for (const dias of p.dias) for (const nivel of p.niveles)
    for (const lugar of p.lugares) for (const mode of p.modalidades) {
      const q = { ...base, objetivo, dias, nivel, lugar };
      const selection = { mode, capacity: "menos_5", bike: true };
      const opts = { gym: gymCandidates(catalog, q), cardio: { A: selection, B: selection, C: selection, D: selection } };
      const output = generateProgram(catalog, q, opts);
      const context = JSON.stringify({ objetivo, dias, nivel, lugar, mode });
      assert.equal(output.state, "ready", context);
      assert.deepEqual(generateProgram(catalog, q, opts), output);
      assert.equal(output.sessions.length, dias);
      for (const session of output.sessions) {
        assert.ok(session.short, context + " " + session.letter);
        assert.ok(session.short.minutes >= 15 && session.short.minutes <= 25, context);
        for (const variant of [session, session.short]) {
          assert.equal(estimate(variant), variant.minutes);
          for (const block of variant.blocks) formats.add(block.format);
          for (const exercise of allItems(variant)) {
            assert.ok(catalog.index.has(exercise.id));
            assert.ok(!exercise.equipment.length || lugar === "gimnasio", context);
          }
        }
      }
      profiles++;
    }
  assert.equal(profiles, 384);
  assert.deepEqual(formats, new Set(["series", "superserie", "rondas", "circuito", "amrap", "emom"]));
});

test("rechaza contraindicación, material incompatible, bicicleta sin confirmar y carrera sin capacidad", () => {
  for (const contraindicacion of ["si", "duda"])
    assert.equal(generateProgram(catalog, { ...base, contraindicacion }).state, "review");
  assert.equal(generateProgram(catalog, { ...base, material: ["ninguno", "banco"] }).state, "invalid");
  assert.equal(generateProgram(catalog, base, { cardio: { A: { mode: "bicicleta" } } }).state, "unavailable");
  assert.equal(generateProgram(catalog, base, { cardio: { A: { mode: "correr" } } }).state, "unavailable");
  const plan = generateProgram(catalog, base, { cardio: { A: { mode: "correr", capacity: "menos_5" } } });
  assert.equal(plan.sessions[0].cardio.mode, "caco");
  assert.equal(plan.sessions[0].cardio.stage, "c1");
  assert.equal(plan.sessions[2].cardio.mode, "caminar");
});

test("estimación bilateral, volumen ponderado y continuidad con cambio de días", () => {
  const plan = generateProgram(catalog, { ...base, objetivo: "hipertrofia", dias: 2, material: ["mancuernas"] });
  assert.equal(plan.state, "ready");
  const session = plan.sessions[0];
  const single = structuredClone(session);
  single.blocks[0].items[0].perSide = false;
  const bilateral = structuredClone(single);
  bilateral.blocks[0].items[0].perSide = true;
  assert.ok(estimate(bilateral) > estimate(single));
  const volume = weeklyVolume(plan.sessions, { primary: 1, secondary: .25 });
  for (const item of Object.values(volume.muscles)) assert.equal(item.equivalent, item.primary + .25 * item.secondary);
  const changed = generateProgram(catalog, { ...base, objetivo: "hipertrofia", dias: 3, material: ["mancuernas"] }, { previous: plan });
  assert.equal(changed.state, "ready");
  assert.deepEqual(allItems(changed.sessions[0]).filter((item) => item.main).map((item) => item.id),
    allItems(session).filter((item) => item.main).map((item) => item.id));
});

test("perfiles exportados y sus alternativas apuntan a IDs del catálogo", () => {
  const profiles = read("./PAUSA_perfiles_ejemplo_v3.json");
  assert.equal(Object.keys(profiles).length, 5);
  for (const profile of Object.values(profiles)) for (const session of profile.sesiones)
    for (const variant of [session, session.alternativa_expres]) for (const exercise of variant.fuerza)
      assert.ok(catalog.index.has(exercise.ejercicio_id));
});

test("variaciones de equipo doméstico y carga concurrente", () => {
  const groups = [["ninguno"], ["bandas"], ["trx"], ["banco"], ["barra_discos", "banco"],
    ["mancuernas", "kettlebell"], ["maquina_cardio"]];
  for (const material of groups) {
    for (const objetivo of p.objetivos) {
      const input = { ...base, material, objetivo, dias: 4 };
      const output = generateProgram(catalog, input, { cardio: { B: { mode: "bicicleta", bike: true } } });
      assert.equal(output.state, "ready", JSON.stringify(input));
      assert.ok(output.volume.legExposures > 0);
      for (const session of output.sessions) for (const variant of [session, session.short]) {
        assert.ok(variant, JSON.stringify(input));
        for (const item of allItems(variant)) assert.ok(item.equipment.every((entry) => material.includes(entry)));
      }
    }
  }
});
