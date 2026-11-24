import { ExerciseCard, ProgramPresentation, SessionPhase, SessionPresentation } from "./WorkoutSession";
import { useExerciseImages } from "./exerciseImages";
import { Disclosure, ResourceCard } from "../components/PausaUI";
import { strengthItems } from "./workoutPlannerV2";

export const labels = {
  fuerza: "Fuerza", combinado: "Fuerza y resistencia", resistencia: "Resistencia cardiovascular",
  inicial: "Inicial", intermedio: "Intermedio", avanzado: "Avanzado",
  casa: "Casa", gimnasio: "Gimnasio", ninguno: "Sin material", mochila: "Mochila con carga",
  bandas: "Bandas elásticas y anclaje seguro si se requiere", mancuernas: "Mancuernas", kettlebell: "Kettlebell",
  caminar: "Caminar", carrera: "Carrera", bicicleta: "Bicicleta", remo: "Remo", skierg: "SkiErg", eliptica: "Elíptica",
  paron: "No he entrenado o vuelvo de un parón", ocasional: "He entrenado ocasionalmente", regular: "He entrenado con regularidad",
  equilibrado: "Equilibrar fuerza y resistencia", fuerza_masa: "Fuerza y masa muscular", salud_general: "Condición física general",
  rendimiento: "Rendimiento en mi modalidad", ninguna: "Ninguna", molestias: "Molestias con determinados movimientos",
  condicion_salud: "Lesión o condición de salud relevante", running: "Running", padel_tenis: "Pádel o tenis",
  futbol: "Fútbol", ciclismo: "Ciclismo", otro: "Otro deporte",
};

const doseUnits = { repeticiones: "repeticiones", segundos: "s", metros: "m" };

function range(value) {
  return Array.isArray(value) ? [...new Set(value)].join("–") : value;
}

function Cardio({ data, minutes }) {
  const format = { continuo: "Continuo", intervalos: "Intervalos", caminar_correr: "Caminar y trotar" }[data.formato];
  const duration = data.trabajo_min ?? data.duracion_min ?? minutes;
  return (
    <div>
      <strong>{format}{duration != null ? ` · ${duration} min` : ""}</strong>
      {data.repeticiones && <p>{data.repeticiones} intervalos · {data.trabajo_seg} s de trabajo · {data.recuperacion_seg} s de recuperación</p>}
      {(data.rpe ?? data.rpe_trabajo) && <p>RPE de trabajo: {range(data.rpe ?? data.rpe_trabajo)}/10</p>}
      {data.rpe_recuperacion && <p>RPE de recuperación: {range(data.rpe_recuperacion)}/10</p>}
      {data.estructura && <p>{data.estructura}</p>}
      {data.nota && <p>{data.nota}</p>}
    </div>
  );
}

function SessionDetails({ session, library, express, forPrint }) {
  const imageFor = useExerciseImages("v2");
  const main = session.parte_principal;
  const cardio = session.cardio ?? main?.cardio ?? (session.objetivo === "resistencia" || session.tipo === "resistencia" ? main : null);
  const exercises = strengthItems(session);
  return <div className="tb-library-session-content">
    {express && <p>{library.reglas.expres}</p>}
    <SessionPhase phase="warmup" duration={`${session.calentamiento.min} min`}>
      <ul>{session.calentamiento.pasos.map((step) => <li key={step}>{step}</li>)}</ul>
    </SessionPhase>
    <SessionPhase phase="main">
      {session.modalidad && <p>Modalidad: {labels[session.modalidad]}</p>}
      {main?.fuerza_min && <p>Bloque de fuerza: {main.fuerza_min} min</p>}
      {main?.duracion_objetivo_min && <p>Duración orientativa del bloque: {main.duracion_objetivo_min} min</p>}
      {exercises.length > 0 && <div className="workout-exercises">{exercises.map((item, index) => {
        const exercise = library.ejercicios[item.ejercicio_id];
        return <ExerciseCard key={`${exercise.id}-${index}`} id={exercise.id} image={imageFor(exercise.id)} number={index + 1} name={exercise.nombre} instruction={exercise.instruccion} expanded={forPrint}
          effort={item.rir_objetivo && `Repeticiones en reserva: ${range(item.rir_objetivo)}. Son las que aún podrías hacer al terminar la serie.`}
          metrics={[
            ["Series", item.series],
            ["Dosis", `${range(item.rango)} ${doseUnits[item.tipo_dosis] ?? item.tipo_dosis}${item.por_lado ? " por lado" : ""}`],
            ["Descanso", `${item.descanso_seg} s`],
          ]} />;
      })}</div>}
      {cardio && <div className="workout-cardio"><Cardio data={cardio} minutes={main?.cardio_min} /></div>}
      {main?.instruccion && <p>{main.instruccion}</p>}
      {main?.nota && !Array.isArray(main) && cardio !== main && <p>{main.nota}</p>}
    </SessionPhase>
    <SessionPhase phase="cooldown" duration={`${session.vuelta_calma.min} min`}>
      <ul>{session.vuelta_calma.pasos.map((step) => <li key={step}>{step}</li>)}</ul>
      {(session.advertencia || exercises.some(({ ejercicio_id }) => ejercicio_id.includes("autorresistencia"))) &&
        <p>{session.advertencia ?? library.reglas.limitacion_sin_material}</p>}
      {session.control && <p>{session.control}</p>}
      {session.nota && <p>{session.nota}</p>}
      {session.restricciones?.length > 0 && <ul>{session.restricciones.map((item) => <li key={item}>{item}</li>)}</ul>}
    </SessionPhase>
  </div>;
}

export function WorkoutResultsV2({ library, output, preferences, week, setWeek, log, record }) {
  const sessions = output.sessions.map(({ session, express }, index) => ({
    id: session.id, title: `Sesión ${index + 1}`, type: labels[session.objetivo], session, express,
  }));
  const duration = (session) => `${range(session.duracion_total_min ?? session.duracion_estimada_min)} min`;
  return <>
    <div className="workout-screen-only">
      <ProgramPresentation title="Tu entrenamiento PAUSA" objective={labels[preferences.objetivo]}
        facts={[["Días semanales", preferences.dias], ["Nivel", labels[preferences.nivel]], ["Lugar", labels[preferences.lugar] ?? "Según la modalidad"]]}
        summary={`Tu semana incluye ${sessions.map(({ type }) => type.toLowerCase()).join(" · ")}.`}
        sessions={sessions} actions={<div className="workout-program-actions">
          <p>Propuesta de preproducción · horizonte de {output.weeks} semanas. Reparte las sesiones según tu disponibilidad.</p>
          {preferences.objetivo !== "fuerza" && <p>Modalidad: {labels[preferences.modalidad]}</p>}
          {preferences.sport && <p>Actividad adicional: {labels[preferences.sport]} · {preferences.sportDays} días. Revisa cómo encaja con las sesiones. El motor no puede recalcular la carga deportiva con la frecuencia sola.</p>}
          <label className="tb-v2-week">Semana de seguimiento
            <select className="platform-select" value={week} onChange={(event) => setWeek(Number(event.target.value))}>
              {Array.from({ length: output.weeks }, (_, index) => <option key={index}>{index + 1}</option>)}
            </select>
          </label>
        </div>}>
        {({ title, type, session, express }) => <>
          <SessionPresentation title={`${title} · ${type}`} full={session} short={express}
            describe={(variant) => {
              const objective = variant.objetivo ?? variant.tipo;
              return {
                objective: labels[objective],
                duration: duration(variant),
                count: strengthItems(variant).length,
                cardio: objective !== "fuerza",
                description: objective === "combinado" ? "Combina ejercicios de fuerza y un tramo cardiovascular." :
                  objective === "resistencia" ? "Entrena tu resistencia al ritmo indicado en la sesión." : "Trabaja la fuerza con pausas entre esfuerzos.",
              };
            }}>
            {(variant, isQuick) => <SessionDetails session={variant} library={library} express={isQuick} />}
          </SessionPresentation>
          <label className="tb-v2-week">Estado de la sesión
            <select className="platform-select" value={log[`${week}:${session.id}`] ?? ""} onChange={(event) => record(session.id, event.target.value)}>
              <option value="">Pendiente</option>
              <option value="completada">Completada</option>
              <option value="parcial">Parcialmente completada</option>
              <option value="no-realizada">No realizada</option>
            </select>
          </label>
        </>}
      </ProgramPresentation>
      <div className="tb-summary-actions"><ResourceCard title="Descargar receta (PDF)" onDownload={() => window.print()} /></div>
    </div>
    <div className="workout-print-only">
      {sessions.map(({ id, title, type, session }) => <section key={id}>
        <h3>{title} · {type} · {duration(session)} estimados</h3>
        <SessionDetails session={session} library={library} forPrint />
      </section>)}
    </div>
  </>;
}
