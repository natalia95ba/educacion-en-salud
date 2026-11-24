import { ExerciseCard, ProgramPresentation, SessionPhase, SessionPresentation } from "./WorkoutSession";
import { useExerciseImages } from "./exerciseImages";
import { useState } from "react";
import { Button, Disclosure, SelectField } from "../components/PausaUI";
import library from "../../PAUSA_V3/PAUSA_biblioteca_ejercicios_v3.json";
import templates from "../../PAUSA_V3/PAUSA_plantillas_sesiones_v3.json";
import { generateProgram, gymCandidates, indexLibrary, validateProgram } from "./workoutPlannerV3";
import "./css/WorkoutGeneratorV3.css";

const catalog = indexLibrary(library, templates);
const storageKey = "pausa-current-program-v3";
const schema = 1;
const defaults = { objetivo: "", dias: 2, nivel: "", lugar: "", material: [], contraindicacion: "" };
const labels = {
  bienestar: "Moverme más y sentirme mejor", hipertrofia: "Ganar masa muscular",
  cardio: "Mejorar mi resistencia cardiovascular", general: "Mejorar mi condición física general",
  principiante: "Principiante", intermedio: "Intermedio", avanzado: "Avanzado",
  casa: "Casa", gimnasio: "Gimnasio", ninguno: "Sin material", mancuernas: "Mancuernas",
  bandas: "Bandas elásticas", kettlebell: "Kettlebell", barra_discos: "Barra y discos", banco: "Banco",
  trx: "TRX con anclaje seguro", maquina_cardio: "Máquina cardiovascular",
  no: "No", si: "Sí", duda: "No lo sé", caminar: "Caminar", caco: "Caminar y trotar",
  correr: "Correr", bicicleta: "Bicicleta", todavia_no: "Todavía no puedo correr de forma continua",
  menos_5: "Menos de 5 minutos", "5_10": "De 5 a 10 minutos", "10_20": "De 10 a 20 minutos", mas_20: "Más de 20 minutos",
  F: "Fuerza", M: "Fuerza y resistencia", C: "Resistencia cardiovascular",
};
const num = (value) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 1 }).format(value);
const statusMessages = {
  review: "Consulta con un profesional sanitario para aclarar en qué condiciones puedes realizar ejercicio.",
  invalid: "Completa las respuestas y revisa el material seleccionado.",
  unavailable: "No encontramos un programa compatible con estas respuestas. Revisa las opciones de material o modalidad.",
};

function readCurrent() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.schema !== schema || saved.plan?.libraryVersion !== library.version ||
        saved.q?.contraindicacion !== "no" || saved.plan?.state !== "ready" ||
        !validateProgram(catalog, saved.q, saved.plan.sessions, saved.gym)) return null;
    return saved;
  } catch {
    return null;
  }
}

function Field({ title, options, value, change }) {
  return <label className="v3-field">
    <span>{title}</span>
    <SelectField value={value} onChange={(e) => change(e.target.value)} required>
      {value === "" && <option value="">Elige una opción</option>}
      {options.map((option) => <option key={option} value={option}>{labels[option] ?? option}</option>)}
    </SelectField>
  </label>;
}

const formatCopy = {
  superserie: "Alterna los dos ejercicios y descansa al finalizar la pareja.",
  rondas: "Completa una serie de cada ejercicio antes de repetir.",
  circuito: "Pasa por las estaciones sin prisas. El tiempo sobrante de cada estación es de recuperación.",
  amrap: "Haz hasta dos rondas con buena técnica y esfuerzo moderado. Acaba antes si lo necesitas y utiliza el tiempo restante para recuperar.",
  emom: "Al comienzo de cada minuto, realiza el ejercicio indicado alternando estaciones. Descansa el tiempo que quede antes del siguiente minuto.",
};

function SessionDetails({ session }) {
  const imageFor = useExerciseImages("v3");
  const cardio = session.cardio;
  let order = 0;
  return <div className="v3-session-body">
    <SessionPhase phase="warmup" duration={`${num(session.warmup.reduce((total, step) => total + step.seconds, 0) / 60)} min`}>
      <ul>{session.warmup.map(({ text, seconds }) => <li key={text}>{text} · {num(seconds / 60)} min</li>)}</ul>
    </SessionPhase>
    <SessionPhase phase="main">
      {session.blocks.map((block, index) => <div key={index} className="v3-block">
        {block.format !== "series" && <p><strong>{formatCopy[block.format]}</strong>{" "}
          {block.seconds ? `${num(block.seconds / 60)} min en total.` : `${block.rounds} rondas · descanso de ${block.rest} s entre rondas.`}
          {block.station && block.format === "circuito" ? ` ${block.station} s por estación.` : ""}</p>}
        <div className="workout-exercises">{block.items.map((item) => <ExerciseCard key={item.id}
          id={item.id} image={imageFor(item.id)} number={++order} name={item.name} instruction={item.instruction}
          effort={`Esfuerzo previsto: ${num(item.rpe)}/10 según cómo percibas la intensidad.`} metrics={[
            [block.format === "series" ? "Series" : "Series previstas", item.series],
            ["Dosis", `${item.range.join("–")} ${{ segundos: "s", metros: "m", repeticiones: "repeticiones" }[item.unit]}${item.perSide ? " por lado" : ""}`],
            ["Descanso", block.format === "series" ? `${item.rest} s entre series` : "Según el bloque"],
          ]} />)}</div>
      </div>)}
      {cardio && <div className="workout-cardio">
        <strong>{labels[cardio.mode]}</strong>
        <p>{cardio.minutes ? `${cardio.minutes} min continuos` :
          `${cardio.repetitions} intervalos de ${cardio.work} s con ${cardio.rest} s de recuperación`} · esfuerzo {cardio.rpe}/10
          {cardio.recoveryRpe && ` · recuperación ${cardio.recoveryRpe}/10`}
          {cardio.stage && ` · etapa ${cardio.stage.slice(1)}`}</p>
      </div>}
    </SessionPhase>
    <SessionPhase phase="cooldown" duration={`${num(session.cooldown / 60)} min`}>
      <p>Reduce el ritmo y recupera una respiración cómoda.</p>
      {session.warnings.map((warning) => <p key={warning}>{warning}</p>)}
    </SessionPhase>
  </div>;
}

function CardioOptions({ current, commit }) {
  const [choice, setChoice] = useState(current);
  const running = choice.mode === "correr" || choice.mode === "caco";
  return <Disclosure summary="Cambiar modalidad cardiovascular">
    <div className="v3-fields">
      <Field title="Modalidad" options={catalog.parametros.modalidades} value={choice.mode} change={(mode) => setChoice({ mode, capacity: "", bike: false, offset: 0 })} />
      {running && <Field title="¿Cuánto tiempo puedes correr seguido cómodamente?" options={catalog.parametros.capacidad_correr}
        value={choice.capacity ?? ""} change={(capacity) => setChoice({ ...choice, capacity, offset: 0 })} />}
      {running && <Field title="Ajuste de etapa para caminar y trotar" options={["Anterior", "Mantener", "Siguiente"]}
        value={["Anterior", "Mantener", "Siguiente"][(choice.offset ?? 0) + 1]} change={(value) =>
          setChoice({ ...choice, offset: ["Anterior", "Mantener", "Siguiente"].indexOf(value) - 1 })} />}
      {choice.mode === "bicicleta" && <label className="v3-check"><input type="checkbox" checked={choice.bike ?? false}
        onChange={(e) => setChoice({ ...choice, bike: e.target.checked })} /> Tengo acceso a una bicicleta</label>}
    </div>
    <Button disabled={(running && !choice.capacity) || (choice.mode === "bicicleta" && !choice.bike)}
      onClick={() => commit(choice)}>Aplicar modalidad</Button>
  </Disclosure>;
}

function SessionCard({ session, selection, update }) {
  return <SessionPresentation title={`Sesión ${session.letter} · ${labels[session.type]}`}
    full={session} short={session.short}
    describe={(variant) => ({
      objective: variant.objective,
      duration: `${num(variant.minutes)} min`,
      count: variant.blocks.reduce((count, block) => count + block.items.length, 0),
      cardio: Boolean(variant.cardio),
      description: variant.type === "M" ? "Combina ejercicios de fuerza y un tramo cardiovascular." :
        variant.type === "C" ? "Entrena tu resistencia regulando el esfuerzo durante la sesión." :
          "Trabaja la fuerza con pausas entre esfuerzos.",
    })}
    controls={session.cardio && <CardioOptions current={selection ?? { mode: "caminar" }} commit={update} />}>
    {(variant) => <SessionDetails session={variant} />}
  </SessionPresentation>;
}

export default function WorkoutGeneratorV3() {
  const [saved, setSaved] = useState(readCurrent);
  const [q, setQ] = useState(() => saved?.suspended ? { ...saved.q, contraindicacion: "" } : saved?.q ?? defaults);
  const [editing, setEditing] = useState(!saved || saved.suspended === true);
  const [message, setMessage] = useState("");
  const [gym, setGym] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const blocked = q.contraindicacion === "si" || q.contraindicacion === "duda";

  function update(key, value) {
    if (key === "contraindicacion" && value !== "no" && saved) {
      const suspended = { ...saved, suspended: true };
      setSaved(suspended);
      try { localStorage.setItem(storageKey, JSON.stringify(suspended)); } catch { /* Keep the gate for this visit. */ }
    }
    setQ((draft) => ({ ...draft, [key]: value }));
    setConfirm(null);
    setGym([]);
    setMessage("");
  }

  function generate(answers, selectedGym, cardio) {
    const plan = generateProgram(catalog, answers, { gym: selectedGym, cardio, previous: saved?.plan });
    if (plan.state !== "ready") {
      setMessage(statusMessages[plan.state]);
      return;
    }
    const next = { schema, date: new Date().toISOString(), q: answers, plan, cardio, gym: selectedGym };
    setSaved(next);
    setEditing(false);
    setConfirm(null);
    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setMessage("");
    } catch {
      setMessage("El navegador no pudo guardar el programa. Puedes consultarlo durante esta visita.");
    }
  }

  function submit(event) {
    event.preventDefault();
    if (blocked) {
      setMessage(statusMessages.review);
      return;
    }
    if (q.lugar === "casa" && !q.material.length) {
      setMessage("Indica el material del que dispones o selecciona «Sin material».");
      return;
    }
    if (q.lugar === "gimnasio") {
      const equipment = gymCandidates(catalog, q);
      const previous = saved?.gym ?? [];
      if (equipment.some((id) => !previous.includes(id))) {
        setGym(previous.filter((id) => equipment.includes(id)));
        setConfirm(equipment);
        return;
      }
    }
    generate(q, q.lugar === "gimnasio" ? saved?.gym ?? [] : [], saved?.cardio ?? {});
  }

  function toggle(value) {
    const selected = q.material.includes(value);
    update("material", selected ? q.material.filter((item) => item !== value) : value === "ninguno" ? [value] :
      [...q.material.filter((item) => item !== "ninguno"), value]);
  }

  const field = (name, title, options) => <Field title={title} options={options} value={q[name]}
    change={(value) => update(name, name === "dias" ? Number(value) : value)} />;

  return <div className="v3-generator">
    {editing ? <form className="v3-card" onSubmit={submit}>
      <h2>Personaliza tu entrenamiento</h2>
      <div className="v3-fields">
        {field("objetivo", "¿Qué te gustaría conseguir entrenando?", catalog.parametros.objetivos)}
        {field("dias", "¿Cuántos días puedes entrenar por semana?", catalog.parametros.dias)}
        {field("nivel", "¿Qué experiencia tienes?", catalog.parametros.niveles)}
        {field("lugar", "¿Dónde entrenarás?", catalog.parametros.lugares)}
        {q.lugar === "casa" && <fieldset>
          <legend>Material disponible en casa</legend>
          {catalog.parametros.material_casa.map((item) => <label key={item} className="v3-check">
            <input type="checkbox" checked={q.material.includes(item)} onChange={() => toggle(item)} /> {labels[item]}
          </label>)}
        </fieldset>}
        {field("contraindicacion", "¿Tienes alguna contraindicación médica para realizar ejercicio?", catalog.parametros.contraindicacion)}
      </div>
      {blocked ? <p role="status">{statusMessages.review}</p> : <Button type="submit">Crear mi entrenamiento</Button>}
      {saved && !saved.suspended && !blocked && <Button onClick={() => { setQ(saved.q); setEditing(false); setConfirm(null); setMessage(""); }}>Volver a mi programa</Button>}
      {confirm && !blocked && <fieldset>
        <legend>Confirma solo el equipo que puedes usar</legend>
        {confirm.map((id) => <label className="v3-check" key={id}>
          <input type="checkbox" checked={gym.includes(id)} onChange={(e) => setGym(e.target.checked ? [...gym, id] : gym.filter((item) => item !== id))} />
          Tengo equipo para {catalog.index.get(id).nombre}
        </label>)}
        <Button onClick={() => generate(q, gym, saved?.cardio ?? {})}>Continuar con este material</Button>
      </fieldset>}
    </form> : saved && <ProgramPresentation title="Tu entrenamiento PAUSA" objective={labels[saved.q.objetivo]}
      facts={[["Días semanales", saved.q.dias], ["Nivel", labels[saved.q.nivel]], ["Lugar", labels[saved.q.lugar]]]}
      summary={`Tu semana incluye ${saved.plan.sessions.map((session) => labels[session.type].toLowerCase()).join(" · ")}.`}
      sessions={saved.plan.sessions.map((session) => ({
        id: session.letter, title: `Sesión ${session.letter}`, type: labels[session.type], session,
      }))}
      actions={<div className="workout-program-actions">
        <p>Reparte las sesiones durante la semana y deja recuperación entre esfuerzos exigentes.</p>
        {saved.q.lugar === "casa" && <p>Material: {saved.q.material.map((item) => labels[item]).join(", ")}.</p>}
        {saved.plan.warnings.map((warning) => <p key={warning}>{warning}</p>)}
        <Button onClick={() => { setEditing(true); setMessage(""); }}>Modificar mis respuestas</Button>
      </div>}>
      {({ session }) => <SessionCard session={session} selection={saved.cardio[session.letter]}
        update={(choice) => generate(saved.q, saved.gym, { ...saved.cardio, [session.letter]: choice })} />}
    </ProgramPresentation>}
    {message && <p role="status">{message}</p>}
  </div>;
}
