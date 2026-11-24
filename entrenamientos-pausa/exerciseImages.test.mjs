import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { approvedImagePath, exercisePlaceholder } from "../src/EnterprisePrivateZone/exerciseImages.js";

const read = (path) => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const catalogs = {
  v2: Object.keys(read("./PAUSA_biblioteca_entrenamientos_v2.json").ejercicios),
  v3: read("../PAUSA_V3/PAUSA_biblioteca_ejercicios_v3.json").ejercicios.map(({ id }) => id),
};

test("cada registro solo puede aprobar IDs y archivos de su propia biblioteca", () => {
  assert.ok(existsSync(new URL(`../public${exercisePlaceholder}`, import.meta.url)));
  for (const [version, ids] of Object.entries(catalogs)) {
    const { imagenes, version: schema } = read(`../public/ejercicios/${version}/imagenes_aprobadas.json`);
    assert.equal(schema, "1");
    for (const [id, path] of Object.entries(imagenes)) {
      assert.ok(ids.includes(id), `${version}: ID no reconocido ${id}`);
      assert.equal(approvedImagePath(version, id, imagenes), path);
      assert.ok(existsSync(new URL(`../public${path}`, import.meta.url)), `Archivo ausente: ${path}`);
    }
    for (const id of ids) {
      const path = `/ejercicios/${version}/${id}.webp`;
      assert.equal(approvedImagePath(version, id, { [id]: path }), path);
      assert.equal(approvedImagePath(version, id, {}), null);
    }
  }
});

test("un ID compartido requiere una aprobación por versión y no admite rutas de revisión", () => {
  const id = "press_pecho_maquina";
  assert.ok(catalogs.v2.includes(id) && catalogs.v3.includes(id));
  const v2 = { [id]: `/ejercicios/v2/${id}.webp` };
  assert.equal(approvedImagePath("v3", id, v2), null);
  assert.equal(approvedImagePath("v2", id, { [id]: "/referencias_para_revision/ref_20.webp" }), null);
  assert.equal(approvedImagePath("v2", "../ref_20", { "../ref_20": "/ejercicios/v2/../ref_20.webp" }), null);
});
