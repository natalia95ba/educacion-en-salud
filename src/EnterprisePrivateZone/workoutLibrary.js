const sessionSources = {
  F: ["sesiones_fuerza", ["nivel", "lugar"]],
  R: ["sesiones_resistencia", ["nivel", "modalidad"]],
  M: ["sesiones_combinadas", ["nivel", "lugar", "modalidad"]],
};

export function selectWorkout(library, preferences) {
  const { objetivo, dias, nivel, lugar, modalidad } = preferences;
  const { parametros } = library;
  if (!parametros.objetivos.includes(objetivo) || !parametros.dias.includes(dias) ||
      !parametros.niveles.includes(nivel) ||
      (objetivo !== "resistencia" && !parametros.lugares.includes(lugar)) ||
      (objetivo !== "fuerza" && !parametros.modalidades.includes(modalidad))) return null;

  const order = library.distribuciones[objetivo]?.[dias];
  if (order?.length !== dias) return null;
  const sessions = order.map((reference) => {
    const [prefix, letter] = reference.split("_");
    const source = sessionSources[prefix];
    if (!source) return null;
    const [collection, fields] = source;
    const key = [...fields.map((field) => preferences[field]), letter].join("_");
    return library[collection]?.[key];
  });
  if (sessions.some((session) => !session)) return null;

  const expressKeys = objetivo === "resistencia"
    ? [`resistencia_${nivel}_${modalidad}`]
    : (dias === 1 ? ["A"] : ["A", "B"]).map((letter) =>
        `${objetivo === "combinado" ? "mixto" : "fuerza"}_${nivel}_${lugar}_${letter}`);
  const express = expressKeys.map((key) => library.sesiones_expres?.[key]);
  return { preferences, sessions, express: express.every(Boolean) ? express : [] };
}
