import { useId, useState } from "react";
import { Activity, ChevronRight, Clock3, Dumbbell, Heart, Zap } from "lucide-react";
import { Button, Disclosure } from "../components/PausaUI";
import { exercisePlaceholder } from "./exerciseImages";
import "./css/WorkoutSession.css";

const phases = {
  warmup: ["Prepara tu cuerpo", Activity],
  main: ["Vamos a entrenar", Dumbbell],
  cooldown: ["Termina con calma", Heart],
};

export function SessionPhase({ phase, duration, children }) {
  const [title, Icon] = phases[phase];
  return <section className="workout-phase">
    <h4><span><Icon aria-hidden="true" /></span>{title}{duration && <small>{duration}</small>}</h4>
    {children}
  </section>;
}

function ExerciseThumbnail({ image, number }) {
  const [failed, setFailed] = useState(false);
  const src = !failed && image ? image : exercisePlaceholder;
  return <span className="workout-thumbnail" aria-hidden="true">
    <img src={src} alt="" loading="lazy" decoding="async" onError={image && !failed ? () => setFailed(true) : undefined} />
    <small>{number}</small>
  </span>;
}

export function ExerciseCard({ id, image, number, name, metrics, effort, instruction, expanded }) {
  return <article className="workout-exercise" data-exercise-id={id}>
    <ExerciseThumbnail key={image ?? exercisePlaceholder} image={image} number={number} />
    <div className="workout-exercise-copy">
      <h5>{name}</h5>
      <dl>{metrics.filter(([, value]) => value != null).map(([label, value]) =>
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    {(instruction || effort) && <Disclosure open={expanded} summary={instruction ? "Cómo hacerlo" : "Ver esfuerzo"}>
      {instruction && <p>{instruction}</p>}
      {effort && <p>{effort}</p>}
    </Disclosure>}
  </article>;
}

export function ProgramPresentation({ title, objective, facts, summary, sessions, children, actions }) {
  const [selected, setSelected] = useState(null);
  const active = sessions.find((item) => item.id === selected) ?? sessions[0];
  const panelId = useId();
  return <section className="workout-program" aria-label={title}>
    <header className="workout-program-hero">
      <div>
        <p className="workout-program-label">Mi programa</p>
        <h2>{title}</h2>
        <p className="workout-program-goal">{objective}</p>
        {summary && <p>{summary}</p>}
      </div>
      <dl>{facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </header>
    {actions}
    {active && <>
      <div className="workout-session-picker" role="group" aria-label="Elige una sesión">
        {sessions.map((item) => <button type="button" key={item.id} aria-pressed={item.id === active.id}
          aria-controls={panelId} onClick={() => setSelected(item.id)}>
          <span><strong>{item.title}</strong><small>{item.type}</small></span>
          <ChevronRight aria-hidden="true" />
        </button>)}
      </div>
      <div id={panelId} key={active.id} className="workout-selected-session" role="region" aria-label={active.title}>
        {children(active)}
      </div>
    </>}
  </section>;
}

export function SessionPresentation({ title, full, short, describe, children, controls, className = "" }) {
  const [quick, setQuick] = useState(false);
  const isQuick = quick && Boolean(short);
  const variant = isQuick ? short : full;
  const info = describe(variant);
  const shortInfo = short && describe(short);
  return <article className={`workout-session ${className}`}>
    <div className="workout-session-top">
      <header className="workout-session-hero">
        <p>Mi sesión · {isQuick ? "Versión exprés" : "Sesión completa"}</p>
        <h3>{title}</h3>
        <p>{info.objective}</p>
        <div className="workout-session-meta">
          <span><Clock3 aria-hidden="true" /> {info.duration} estimados</span>
          <span><Dumbbell aria-hidden="true" /> {info.count} {info.count === 1 ? "ejercicio" : "ejercicios"}{info.cardio ? " · Cardio" : ""}</span>
        </div>
        <p>{info.description}</p>
      </header>
      {short && <aside className="workout-quick">
        <Zap aria-hidden="true" />
        <div>
          <h4>{isQuick ? "Estás en la versión exprés" : "¿Hoy vas justo de tiempo?"}</h4>
          <p>{shortInfo.duration} estimados · Alternativa exprés</p>
          <Button onClick={() => setQuick(!isQuick)}>
            {isQuick ? "Volver a la sesión completa" : "Solo tengo 20 minutos"}
          </Button>
        </div>
      </aside>}
    </div>
    {controls}
    {children(variant, isQuick)}
  </article>;
}
