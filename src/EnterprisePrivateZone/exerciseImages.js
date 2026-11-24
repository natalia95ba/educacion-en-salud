import { useEffect, useState } from "react";

const manifests = new Map();
const base = import.meta.env?.BASE_URL ?? "/";
const versions = ["v2", "v3"];
export const exercisePlaceholder = `${base}ejercicios/placeholder_ejercicio.svg`;

export function approvedImagePath(version, id, images) {
  if (!versions.includes(version) || typeof id !== "string" || !/^[a-z0-9_]+$/.test(id) ||
      !images || !Object.hasOwn(images, id)) return null;
  const path = `/ejercicios/${version}/${id}.webp`;
  return images[id] === path ? `${base}${path.slice(1)}` : null;
}

function loadManifest(version) {
  if (!manifests.has(version)) {
    const request = fetch(`${base}ejercicios/${version}/imagenes_aprobadas.json`)
      .then((response) => {
        if (!response.ok) throw new Error("Registro no disponible");
        return response.json();
      })
      .then((manifest) => {
        if (manifest?.version !== "1" || !manifest.imagenes ||
            typeof manifest.imagenes !== "object" || Array.isArray(manifest.imagenes)) {
          throw new Error("Registro de imágenes inválido");
        }
        return manifest.imagenes;
      })
      .catch(() => {
        manifests.delete(version);
        return null;
      });
    manifests.set(version, request);
  }
  return manifests.get(version);
}

export function useExerciseImages(version) {
  const [loaded, setLoaded] = useState(null);
  useEffect(() => {
    if (!versions.includes(version)) return;
    let active = true;
    loadManifest(version).then((images) => {
      if (active) setLoaded({ version, images });
    });
    return () => { active = false; };
  }, [version]);

  return (id) => approvedImagePath(version, id, loaded?.version === version ? loaded.images : null);
}
