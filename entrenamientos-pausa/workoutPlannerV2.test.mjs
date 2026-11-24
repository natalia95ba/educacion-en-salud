import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { planWorkout, strengthItems } from "../src/EnterprisePrivateZone/workoutPlannerV2.js";

const folder = fileURLToPath(new URL("./", import.meta.url));
const library = JSON.parse(readFileSync(new URL("./PAUSA_biblioteca_entrenamientos_v2.json", import.meta.url), "utf8"));
const p = library.parametros;
const confirmAll = Object.keys(library.ejercicios);
const defaults = {
  objetivo: "combinado", dias: 4, nivel: "intermedio", lugar: "casa", modalidad: "caminar",
  experiencia: "regular", prioridad: "equilibrado", material: ["ninguno"], equipoCardio: true,
  carreraReciente: true, alerta: false, limitacion: "ninguna",
};

const cases = p.objetivos.flatMap((objetivo) => p.dias.flatMap((dias) =>
  p.niveles.flatMap((nivel) => p.lugares.flatMap((lugar) => p.modalidades.map((modalidad) => ({
    ...defaults, objetivo, dias, nivel, lugar, modalidad, prioridad: objetivo === "combinado" ? "equilibrado" : p.prioridades[objetivo][0],
  }))))));

test("432 combinaciones estructurales, duración y vínculos exprés", () => {
  let missingExpress = 0;
  for (const input of cases) {
    const result = planWorkout(library, input, confirmAll);
    assert.equal(result.status, "ok", JSON.stringify(input));
    assert.equal(result.sessions.length, input.dias);
    for (const { session, express } of result.sessions) {
      assert.ok(session.calentamiento && session.vuelta_calma);
      if (!express) {
        assert.equal(session.objetivo, "fuerza");
        assert.ok(["C", "D"].includes(session.letra));
        missingExpress++;
        continue;
      }
      assert.equal(express.duracion_total_min, 20);
      assert.equal(express.tipo, session.objetivo);
      if (session.objetivo !== "resistencia") assert.equal(express.letra, session.letra);
      if (session.objetivo !== "fuerza") assert.equal(express.modalidad, input.modalidad);
    }
  }
  assert.equal(cases.length, 432);
  assert.ok(missingExpress);
});

test("catálogo y referencias, incluidas las sustituciones", () => {
  assert.equal(confirmAll.length, 64);
  const counts = { sesiones_fuerza: 24, sesiones_resistencia: 72, sesiones_combinadas: 72, sesiones_expres: 42 };
  for (const [collection, count] of Object.entries(counts)) {
    assert.equal(Object.keys(library[collection]).length, count);
    for (const [id, session] of Object.entries(library[collection])) {
      assert.equal(session.id, id);
      for (const item of strengthItems(session)) {
        assert.ok(library.ejercicios[item.ejercicio_id], item.ejercicio_id);
        assert.ok(item.series && item.rango?.length && item.rir_objetivo?.length && item.descanso_seg > 0);
      }
    }
  }
  const variants = Object.values(library.reglas.variantes_por_patron).flatMap((place) => Object.values(place).flat());
  const replacements = Object.values(library.reglas.seleccion_por_material).flatMap(Object.values);
  for (const id of [...variants, ...replacements]) assert.ok(library.ejercicios[id], id);
});

test("material de casa y confirmaciones de gimnasio y cardio", () => {
  const real = p.material_casa.filter((item) => item !== "ninguno");
  for (let mask = 0; mask < 2 ** real.length; mask++) {
    const material = mask === 0 ? ["ninguno"] : real.filter((_, i) => mask & (1 << i));
    for (const nivel of p.niveles) {
      for (const objetivo of ["fuerza", "combinado"]) {
        const result = planWorkout(library, { ...defaults, objetivo, nivel, material, prioridad: objetivo === "fuerza" ? "fuerza_masa" : "equilibrado" });
        assert.equal(result.status, "ok");
        for (const { session, express } of result.sessions)
          for (const item of [...strengthItems(session), ...(express ? strengthItems(express) : [])])
            assert.ok(library.ejercicios[item.ejercicio_id].material_obligatorio.every((required) => material.includes(required)));
      }
    }
  }
  assert.equal(planWorkout(library, { ...defaults, material: ["ninguno", "bandas"] }).status, "invalid");
  for (const modalidad of ["bicicleta", "remo", "skierg", "eliptica"]) {
    assert.equal(planWorkout(library, { ...defaults, modalidad, equipoCardio: false }).status, "cardio-equipment");
  }
  const gym = { ...defaults, lugar: "gimnasio" };
  const gate = planWorkout(library, gym);
  assert.equal(gate.status, "gym-equipment");
  assert.equal(planWorkout(library, gym, gate.required.slice(1)).status, "gym-equipment");
  assert.equal(planWorkout(library, gym, gate.required).status, "ok");
});

test("seguridad, parón, prioridad y ausencia de plantilla", () => {
  for (const reply of [{ alerta: true }, { limitacion: "molestias" }, { limitacion: "condicion_salud" }])
    assert.equal(planWorkout(library, { ...defaults, ...reply }).status, "review");
  assert.equal(planWorkout(library, { ...defaults, alerta: "" }).status, "invalid");
  assert.equal(planWorkout(library, { ...defaults, dias: 1, modalidad: "carrera", experiencia: "paron" }).status, "running");
  const run = planWorkout(library, { ...defaults, objetivo: "resistencia", prioridad: "salud_general", modalidad: "carrera", carreraReciente: false });
  assert.ok(run.sessions.every(({ session, express }) => session.parte_principal.formato === "caminar_correr" && !express));
  assert.deepEqual(planWorkout(library, { ...defaults, prioridad: "fuerza" }).sessions.map(({ session }) => session.objetivo),
    ["fuerza", "resistencia", "fuerza", "fuerza"]);
  assert.equal(planWorkout({ ...library, sesiones_fuerza: {} }, defaults).status, "missing");
});

test("equivalencia con las sesiones completas de Python", { skip: !process.env.PAUSA_PYTHON }, () => {
  const extra = [
    { ...defaults, experiencia: "paron", modalidad: "carrera", dias: 4, prioridad: "resistencia" },
    { ...defaults, experiencia: "paron", dias: 2, material: ["bandas"] },
    { ...defaults, experiencia: "paron", dias: 4, prioridad: "fuerza", material: ["mancuernas", "mochila"] },
  ];
  const inputs = [...cases, ...extra];
  const python = spawnSync(process.env.PAUSA_PYTHON, ["-B", "-c", [
    "import json, sys, runpy",
    "generate=runpy.run_path(sys.argv[1])['generate']",
    "rows=json.load(sys.stdin)",
    "print(json.dumps([generate(**row)['sesiones'] for row in rows]))",
  ].join("\n"), "PAUSA_motor_referencia_v2.py"], {
    cwd: folder, encoding: "utf8", maxBuffer: 16 * 1024 * 1024,
    input: JSON.stringify(inputs.map(({ equipoCardio, carreraReciente, limitacion, ...input }) =>
      ({ ...input, equipo_cardio: equipoCardio ? [input.modalidad] : [] }))),
  });
  assert.equal(python.status, 0, python.stderr);
  const reference = JSON.parse(python.stdout);
  inputs.forEach((input, index) => {
    const result = planWorkout(library, input, confirmAll);
    assert.deepEqual(result.sessions?.map(({ session }) => session), reference[index], JSON.stringify(input));
  });
});
