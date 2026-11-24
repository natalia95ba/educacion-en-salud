import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button, ResourceCard, SelectField } from "../components/PausaUI";
import library from "../../entrenamientos-pausa/pausa_biblioteca_entrenamientos_v1.json";
import { selectWorkout } from "./workoutLibrary";

const labels = {
  fuerza: "Solo fuerza", combinado: "Fuerza + resistencia", resistencia: "Solo resistencia",
  inicial: "Inicial", intermedio: "Intermedio", avanzado: "Avanzado", casa: "Casa", gimnasio: "Gimnasio",
  caminar: "Caminar", carrera: "Carrera", bicicleta: "Bicicleta", remo: "Remo",
  skierg: "SkiErg", eliptica: "Elíptica",
};

const sessionLabels = { fuerza: "Fuerza", resistencia: "Resistencia", combinado: "Mixta", mixto: "Mixta" };
const { parametros } = library;

function Preference({ name, title, options, value, onChange }) {
  return (
    <label className="tb-preference">
      <div>
        <strong>{title}</strong>
        <SelectField name={name} value={value} onChange={onChange}>
          {options.map((option) => <option key={option} value={option}>{labels[option] ?? option}</option>)}
        </SelectField>
      </div>
    </label>
  );
}

function SessionCard({ session, index, express = false, modality }) {
  const exercises = session.ejercicios ?? session.fuerza;
  const duration = session.duracion_total_min
    ? `${session.duracion_total_min} min` : `Hasta ${session.duracion_objetivo_min} min · orientativo`;
  const cardio = session.modalidad ?? (session.tipo === "mixto" ? modality : null);
  const warmupMinutes = session.calentamiento_min ?? session.preparacion_min;
  const cooldownMinutes = session.cierre_min ?? session.vuelta_calma_min;
  const main = session.bloque_principal ?? session.resistencia ?? session.bloque;
  return (
    <article className="tb-summary-workout tb-library-session">
      <div className="tb-summary-workout-heading">
        <strong>{express ? "Alternativa" : `Sesión ${index + 1}`} · {sessionLabels[session.tipo]} {session.sesion}</strong>
        <small>{duration}</small>
      </div>
      <div className="tb-library-session-content">
        {cardio && <p><strong>Modalidad:</strong> {labels[cardio]}</p>}
        <p><strong>Preparación:</strong> {session.calentamiento ?? `${warmupMinutes} min`}</p>
        {(session.intensidad ?? session.intensidad_guia) && <p><strong>Intensidad:</strong> {session.intensidad ?? session.intensidad_guia}</p>}
        {exercises && (
          <>
            {session.fuerza_min && <p><strong>Bloque de fuerza:</strong> {session.fuerza_min} min</p>}
            <ul>
              {exercises.map((exercise, position) => (
                <li key={position}>
                  <strong>{exercise.ejercicio}</strong>
                  <span>{exercise.series} series · {exercise.dosis} · descanso {exercise.descanso_seg} s</span>
                  <span>{exercise.indicacion}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        {main && <p><strong>Resistencia{session.resistencia_min ? ` · ${session.resistencia_min} min` : ""}:</strong> {main}</p>}
        {session.circuito && (
          <>
            <p><strong>Circuito:</strong> {session.rondas} rondas · {session.bloque_min} min</p>
            <ol>
              {session.circuito.map((station, position) => (
                <li key={position}>
                  <strong>{station.patron === "cardio" ? labels[cardio] : station.ejercicio}</strong>
                  <span>Trabajo: {station.trabajo} · transición: {station.transicion}</span>
                  <span>{station.indicacion}</span>
                </li>
              ))}
            </ol>
          </>
        )}
        <p><strong>Vuelta a la calma:</strong> {session.vuelta_calma ?? `${cooldownMinutes} min`}</p>
        {session.nota_modalidad && <p>{session.nota_modalidad}</p>}
        {session.nota && <p>{session.nota}</p>}
      </div>
    </article>
  );
}

export default function DraftWorkoutGenerator() {
  const [preferences, setPreferences] = useState({
    objetivo: "combinado", dias: 2, nivel: "inicial", lugar: "casa", modalidad: "caminar",
  });
  const [result, setResult] = useState(null);
  const heading = useRef(null);
  const { objetivo } = preferences;

  useEffect(() => {
    if (result) heading.current?.focus();
  }, [result]);

  function changePreference(event) {
    const { name, value } = event.target;
    setPreferences((current) => ({ ...current, [name]: name === "dias" ? Number(value) : value }));
    setResult(null);
  }

  return (
    <div className="tb-page tb-generator--embedded tb-library">
      <form className="tb-panel tb-library-controls" onSubmit={(event) => {
        event.preventDefault();
        setResult({ plan: selectWorkout(library, preferences) });
      }}>
        <h2>Personaliza tu entrenamiento</h2>
        <p><strong>Borrador técnico · Solo en desarrollo.</strong> {library.aviso}</p>
        <div className="tb-preferences">
          <Preference name="objetivo" title="Objetivo" options={parametros.objetivos} value={objetivo} onChange={changePreference} />
          <Preference name="dias" title="Días por semana" options={parametros.dias} value={preferences.dias} onChange={changePreference} />
          <Preference name="nivel" title="Nivel" options={parametros.niveles} value={preferences.nivel} onChange={changePreference} />
          {objetivo !== "resistencia" && <Preference name="lugar" title="Lugar para fuerza" options={parametros.lugares} value={preferences.lugar} onChange={changePreference} />}
          {objetivo !== "fuerza" && <Preference name="modalidad" title="Modalidad cardiovascular" options={parametros.modalidades} value={preferences.modalidad} onChange={changePreference} />}
        </div>
        <Button type="submit" className="tb-generate-button">Generar mi receta PAUSA</Button>
      </form>
      {result && (
        <section className="tb-library-results">
          <h2 tabIndex={-1} ref={heading}>Tu entrenamiento personalizado</h2>
          {result.plan ? (
            <>
              <p><strong>Borrador técnico · Pendiente de revisión profesional.</strong></p>
              <p>{library.reglas.semana}</p>
              <p>Comprueba que dispones del material indicado en la sesión. Si te falta equipo, cambia tus preferencias y vuelve a generar la propuesta.</p>
              {result.plan.sessions.map((session, index) => <SessionCard key={session.id} session={session} index={index} />)}
              <details className="tb-panel tb-library-express">
                <summary><ChevronDown aria-hidden="true" /> Alternativa exprés · 20 min</summary>
                <p>{library.reglas.expres}</p>
                {result.plan.express.length
                  ? result.plan.express.map((session) => <SessionCard key={session.id} session={session} express modality={preferences.modalidad} />)
                  : <p>Esta combinación todavía no tiene una alternativa exprés.</p>}
              </details>
              <div className="tb-summary-actions"><ResourceCard title="Descargar receta (PDF)" onDownload={() => window.print()} /></div>
            </>
          ) : <p>No hay una propuesta completa para estas preferencias en la biblioteca. Cambia una opción y vuelve a intentarlo.</p>}
        </section>
      )}
    </div>
  );
}
