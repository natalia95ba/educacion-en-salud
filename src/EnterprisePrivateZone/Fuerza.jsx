import { Link } from "react-router-dom";
import { BlockHighlights, BlockPage, ResourceCard } from "../components/PausaUI";
import { blocks } from "./pausaNavigation";
import { WorkoutGenerator } from "./TrainingBuilder";

function PlanB() {
  return (
    <>
      <h3>1. Entiende tu PAUSA</h3>
      <p>Por qué entrenar fuerza y cardio, qué es la Receta PAUSA y cómo encajarla en tu semana.</p>
      <h3>2. Ponlo en práctica</h3>
      <p><strong>Receta PAUSA A/B.</strong> Dos sesiones guiadas de fuerza y trabajo cardiovascular (20–40 min). Si haces una tercera sesión, alterna A–B–A y B–A–B.</p>
      <Link className="platform-button" to={blocks.fuerza.childPath}>Generador de entrenamientos</Link>
      <h3>3. Recursos de uso rápido</h3>
      <div className="platform-resource-list">
        <ResourceCard title="Guía de progresión (PDF)" />
        <ResourceCard title="Biblioteca de ejercicios" />
      </div>
    </>
  );
}

export function Fuerza() {
  return (
    <BlockPage area={blocks.fuerza} bodies={{
      "plan-b": <PlanB />,
      entrenamiento: <WorkoutGenerator embedded />,
      progresion: <ResourceCard title="Guía de progresión (PDF)" />,
    }}>
      <BlockHighlights items={[
        ["Entrenamiento esencial", "La Receta PAUSA, flexible y práctica."],
        ["Plan personalizado", "Según tus días, nivel y lugar."],
        ["Progresión segura", "Mejora sin complicaciones."],
        ["Enfoque práctico", "Adaptable a tu vida diaria."],
      ]} />
    </BlockPage>
  );
}
