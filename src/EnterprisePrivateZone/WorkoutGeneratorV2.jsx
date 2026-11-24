import { useEffect, useRef, useState } from "react";
import { Button, SelectField } from "../components/PausaUI";
import library from "../../entrenamientos-pausa/PAUSA_biblioteca_entrenamientos_v2.json";
import { cardioEquipment, planWorkout, strengthItems } from "./workoutPlannerV2";
import { labels, WorkoutResultsV2 } from "./WorkoutResultsV2";

const { parametros: options } = library;
const storageKey = "pausa-training-v2";
const defaults = {
  objetivo: "combinado", dias: 2, nivel: "inicial", lugar: "casa", modalidad: "caminar",
  material: [], equipoCardio: false, carreraReciente: "", experiencia: "", prioridad: "equilibrado",
  sport: "", sportDays: 1, limitacion: "", alerta: "",
};
const steps = ["Objetivo y disponibilidad", "Lugar y equipamiento", "Experiencia y seguridad"];
const messages = {
  review: "Tus respuestas requieren una valoración individual antes de preparar un plan. Consulta con un profesional cualificado.",
  missing: "La biblioteca no tiene una propuesta compatible. Revisa el material o cambia tus preferencias.",
  invalid: "Completa las respuestas pendientes y comprueba las opciones elegidas.",
  running: "No hay una sesión mixta adecuada para volver a correr con estas preferencias. Puedes elegir caminar y volver a generar.",
  "cardio-equipment": "Confirma que tienes acceso al equipamiento o selecciona otra modalidad.",
};

function readHistory() {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) ?? "{}");
    return data && typeof data === "object" && !Array.isArray(data) ? data : {};
  } catch {
    return {};
  }
}

function programKey(result) {
  const signature = (session) => session && [
    session.id, session.modalidad,
    strengthItems(session).map((item) => [item.ejercicio_id, item.series]),
    session.objetivo === "resistencia" ? session.parte_principal : null,
  ];
  return JSON.stringify([result.version, result.sessions.map(({ session, express }) => [signature(session), signature(express)])]);
}

function initialPreferences() {
  const latest = Object.values(readHistory()).filter((entry) => entry?.configuration)
    .sort((a, b) => b.generatedAt - a.generatedAt)[0]?.configuration;
  return { ...defaults, ...latest };
}

function Field({ title, values, value, change, placeholder }) {
  return <label className="tb-preference"><div><strong>{title}</strong>
    <SelectField value={value} onChange={(event) => change(event.target.value)} required>
      {placeholder && <option value="">{placeholder}</option>}
      {values.map((item) => <option key={item} value={item}>{labels[item] ?? item}</option>)}
    </SelectField>
  </div></label>;
}

export default function WorkoutGeneratorV2() {
  const [p, setP] = useState(initialPreferences);
  const [step, setStep] = useState(0);
  const [output, setOutput] = useState(null);
  const [confirmedGym, setConfirmedGym] = useState([]);
  const [week, setWeek] = useState(1);
  const [history, setHistory] = useState(readHistory);
  const [storageError, setStorageError] = useState(false);
  const heading = useRef(null);
  const strength = p.objetivo !== "resistencia";
  const cardio = p.objetivo !== "fuerza";
  const requiresEquipment = cardio && cardioEquipment.includes(p.modalidad);
  const safetyAnswered = p.limitacion !== "" && p.alerta !== "";
  const planKey = output?.status === "ok" ? programKey(output) : null;

  useEffect(() => { if (output) heading.current?.focus(); }, [output]);

  function update(name, value) {
    setP((current) => ({
      ...current, [name]: value,
      ...(name === "objetivo" ? { prioridad: value === "combinado" ? "equilibrado" : options.prioridades[value][0] } : {}),
      ...(name === "modalidad" ? { equipoCardio: false, carreraReciente: "" } : {}),
    }));
    setConfirmedGym([]);
    setOutput(null);
  }

  function save(key, data) {
    const next = { ...readHistory(), ...history, [key]: data };
    setHistory(next);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }

  function generate(confirmations = confirmedGym) {
    const result = planWorkout(library, p, confirmations);
    setOutput(result);
    if (result.status === "ok" && planKey === null) {
      const key = programKey(result);
      const { objetivo, dias, nivel, lugar, modalidad, prioridad, experiencia } = p;
      save(key, {
        version: result.version, sessions: result.sessions,
        configuration: { objetivo, dias, nivel, lugar, modalidad, prioridad, experiencia },
        generatedAt: Date.now(), log: history[key]?.log ?? {},
      });
      setWeek(1);
    }
  }

  function record(sessionId, status) {
    const entry = history[planKey];
    if (entry) save(planKey, { ...entry, log: { ...entry.log, [`${week}:${sessionId}`]: status } });
  }

  function toggleMaterial(value) {
    const selected = p.material.includes(value);
    update("material", value === "ninguno" ? (selected ? [] : [value]) :
      selected ? p.material.filter((item) => item !== value) : [...p.material.filter((item) => item !== "ninguno"), value]);
  }

  const field = (name, title, values, placeholder, convert = (value) => value) =>
    <Field title={title} values={values} value={p[name]} placeholder={placeholder} change={(value) => update(name, convert(value))} />;
  const logisticsComplete = (!strength || p.lugar !== "casa" || p.material.length > 0) &&
    (!requiresEquipment || p.equipoCardio) && (!cardio || p.modalidad !== "carrera" || p.carreraReciente !== "");

  return (
    <div className="tb-page tb-generator--embedded tb-library tb-v2">
      <form className="tb-panel tb-library-controls" onSubmit={(event) => {
        event.preventDefault();
        if (step < steps.length - 1) setStep(step + 1);
        else generate();
      }}>
        <h2>Personaliza tu entrenamiento</h2>
        <p>V2 · Vista de desarrollo con biblioteca de preproducción. Propuesta general, sin valoración individual.</p>
        <fieldset className="tb-v2-fields">
          <legend>Paso {step + 1} de {steps.length} · {steps[step]}</legend>
          {step === 0 && <div className="tb-preferences">
            {field("objetivo", "Objetivo", options.objetivos)}
            {field("dias", "Días por semana", options.dias, undefined, Number)}
            {field("nivel", "Nivel", options.niveles)}
          </div>}
          {step === 1 && <>
            <div className="tb-preferences">
              {field("lugar", "Lugar de entrenamiento", options.lugares)}
              {cardio && field("modalidad", "Modalidad cardiovascular preferida", options.modalidades)}
              {cardio && p.modalidad === "carrera" &&
                <Field title="¿Has corrido con regularidad recientemente?" values={["Sí", "No"]} placeholder="Selecciona una opción"
                  value={p.carreraReciente === "" ? "" : p.carreraReciente ? "Sí" : "No"} change={(value) => update("carreraReciente", value === "Sí")} />}
            </div>
            {strength && p.lugar === "casa" && <fieldset className="tb-v2-fields">
              <legend>Material disponible en casa</legend>
              {options.material_casa.map((item) => <label key={item} className="tb-v2-check">
                <input type="checkbox" checked={p.material.includes(item)} onChange={() => toggleMaterial(item)} /> {labels[item]}
              </label>)}
            </fieldset>}
            {requiresEquipment && <label className="tb-v2-check">
              <input type="checkbox" checked={p.equipoCardio} onChange={(event) => update("equipoCardio", event.target.checked)} />
              Confirmo que tengo acceso al equipo para {labels[p.modalidad]}
            </label>}
          </>}
          {step === 2 && <>
            <div className="tb-preferences">
              {field("experiencia", "Entrenamiento en los últimos tres meses", options.experiencia, "Selecciona una opción")}
              {p.objetivo === "combinado" && p.dias >= 3 && field("prioridad", "Prioridad", options.prioridades.combinado)}
              {field("limitacion", "¿Tienes alguna limitación relevante?", options.limitaciones, "Selecciona una opción")}
              <Field title="¿Has tenido alguna de las señales de alarma indicadas?" values={["Sí", "No"]} placeholder="Selecciona una opción"
                value={p.alerta === "" ? "" : p.alerta ? "Sí" : "No"} change={(value) => update("alerta", value === "Sí")} />
            </div>
            <p>Señales de alarma: {library.reglas.seguridad.sintomas_alarma.join(", ")}.</p>
            <DisclosureSports p={p} field={field} update={update} />
          </>}
        </fieldset>
        <div className="tb-v2-actions">
          {step > 0 && <Button onClick={() => { setStep(step - 1); setOutput(null); }}>Anterior</Button>}
          <Button type="submit" className="tb-generate-button" disabled={step === 1 ? !logisticsComplete : step === 2 && !safetyAnswered}>
            {step === 2 ? "Generar mi entrenamiento" : "Continuar"}
          </Button>
        </div>
      </form>

      {output && <section className="tb-library-results" aria-label="Resultado del generador">
        <h2 ref={heading} tabIndex={-1}>{output.status === "ok" ? "Tu entrenamiento PAUSA" : "Revisa tus preferencias"}</h2>
        {output.status === "gym-equipment" ? (
          <fieldset className="tb-v2-fields tb-panel">
            <legend>Confirma el material para estos ejercicios</legend>
            {output.required.map((id) => <label className="tb-v2-check" key={id}>
              <input type="checkbox" checked={confirmedGym.includes(id)} onChange={(event) =>
                setConfirmedGym((current) => event.target.checked ? [...current, id] : current.filter((item) => item !== id))} />
              Tengo acceso al equipo para {library.ejercicios[id].nombre}
            </label>)}
            <p>Si te falta algún equipo, cambia tus preferencias. La biblioteca no define sustituciones de gimnasio con dosis verificadas para todos los casos.</p>
            <Button disabled={!output.required.every((id) => confirmedGym.includes(id))} onClick={() => generate()}>
              Confirmar equipamiento
            </Button>
          </fieldset>
        ) : output.status === "ok" ? (
          <WorkoutResultsV2 library={library} output={output} preferences={p} week={week} setWeek={setWeek}
            log={history[planKey]?.log ?? {}} record={record} />
        ) : <p>{messages[output.status]}</p>}
        {storageError && <p role="status">El navegador no permitió guardar el registro. Los cambios solo están disponibles en esta visita.</p>}
      </section>}
    </div>
  );
}

function DisclosureSports({ p, field, update }) {
  return <details className="tb-panel tb-library-express">
    <summary>Actividad deportiva adicional (opcional)</summary>
    <div className="tb-preferences">
      <Field title="Actividad principal" values={["No", ...options.deportes_adicionales]} value={p.sport || "No"}
        change={(value) => update("sport", value === "No" ? "" : value)} />
      {p.sport && field("sportDays", "Días por semana", [1, 2, 3, 4, 5, 6, 7], undefined, Number)}
    </div>
  </details>;
}
