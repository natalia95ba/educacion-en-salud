import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { selectWorkout } from "../src/EnterprisePrivateZone/workoutLibrary.js";

const library = JSON.parse(readFileSync(new URL("./pausa_biblioteca_entrenamientos_v1.json", import.meta.url), "utf8"));
const { parametros: p } = library;
const order = {
  fuerza: ["F_A", "F_B", "F_C", "F_D"],
  resistencia: ["R_A", "R_B", "R_C", "R_D"],
  combinado: [["M_A"], ["M_A", "M_B"], ["F_A", "R_A", "F_B"], ["F_A", "R_A", "F_B", "R_B"]],
};

test("210 plantillas con IDs únicos; dosis y bloques presentes", () => {
  const ids = new Set();
  for (const [collection, count] of Object.entries({
    sesiones_fuerza: 24, sesiones_resistencia: 72, sesiones_combinadas: 72, sesiones_expres: 42,
  })) {
    const entries = Object.entries(library[collection]);
    assert.equal(entries.length, count);
    const groups = new Map();
    for (const [key, session] of entries) {
      assert.ok(session.id.endsWith("_" + key), session.id);
      assert.ok(!ids.has(session.id), session.id);
      ids.add(session.id);
      const { id, tipo, nivel, lugar, modalidad, sesion, ...payload } = session;
      const signature = JSON.stringify(payload);
      groups.set(signature, (groups.get(signature) ?? 0) + 1);
      const exercises = session.ejercicios ?? session.fuerza;
      if (exercises) {
        assert.equal(exercises.length, tipo === "fuerza" ? 5 : 3, id);
        for (const exercise of exercises) {
          assert.ok(exercise.ejercicio && exercise.dosis && exercise.series > 0 && exercise.descanso_seg > 0 && exercise.indicacion, id);
        }
      }
      if (collection === "sesiones_expres") {
        assert.equal((session.preparacion_min ?? session.calentamiento_min) + session.bloque_min +
          (session.cierre_min ?? session.vuelta_calma_min), 20, id);
        if (session.circuito) {
          assert.equal(session.circuito.length * session.rondas, session.bloque_min, id);
          for (const station of session.circuito) assert.ok(station.ejercicio && station.trabajo && station.transicion && station.indicacion, id);
        } else assert.ok(session.bloque, id);
      }
      if (collection === "sesiones_combinadas") {
        assert.equal(session.calentamiento_min + session.fuerza_min + session.resistencia_min + session.cierre_min, 60, id);
        assert.ok(session.resistencia, id);
      }
      if (collection === "sesiones_fuerza") assert.ok(session.calentamiento && session.intensidad && session.vuelta_calma, id);
      if (collection === "sesiones_resistencia") assert.ok(session.calentamiento && session.bloque_principal && session.vuelta_calma && session.intensidad_guia, id);
    }
    const repeats = [...groups.values()].filter((value) => value > 1);
    console.log(collection, { groups: repeats.length, templates: repeats.reduce((total, value) => total + value, 0) });
  }
  assert.equal(ids.size, 210);
});

test("las 240 combinaciones semanales resuelven el orden de la guía y una alternativa exprés", () => {
  let count = 0;
  for (const objetivo of p.objetivos)
    for (const dias of p.dias)
      for (const nivel of p.niveles)
        for (const lugar of objetivo === "resistencia" ? [undefined] : p.lugares)
          for (const modalidad of objetivo === "fuerza" ? [undefined] : p.modalidades) {
            const plan = selectWorkout(library, { objetivo, dias, nivel, lugar, modalidad });
            const expected = objetivo === "combinado" ? order.combinado[dias - 1] : order[objetivo].slice(0, dias);
            assert.deepEqual(plan?.sessions.map((session) => session.id[0] + "_" + session.sesion), expected);
            for (const session of plan.sessions) {
              assert.equal(session.nivel, nivel);
              if (session.lugar) assert.equal(session.lugar, lugar);
              if (session.modalidad) assert.equal(session.modalidad, modalidad);
            }
            assert.equal(plan.express.length, objetivo === "resistencia" || dias === 1 ? 1 : 2);
            assert.ok(plan.express.every((session) => session.duracion_total_min === 20));
            count++;
          }
  assert.equal(count, 240);
});

test("una sesión ausente no se sustituye y una alternativa ausente no invalida la semana", () => {
  const options = { objetivo: "fuerza", dias: 1, nivel: "inicial", lugar: "casa" };
  assert.equal(selectWorkout({ ...library, sesiones_fuerza: {} }, options), null);
  assert.deepEqual(selectWorkout({ ...library, sesiones_expres: {} }, options).express, []);
  assert.equal(selectWorkout(library, { ...options, dias: 5 }), null);
});
