import { BlockHighlights, BlockPage, ResourceCard, VideoPlayer } from "../components/PausaUI";
import { blocks } from "./pausaNavigation";

function NeckExperience() {
  return (
    <>
      <h3>1. Entiende tu PAUSA</h3>
      <strong>Vídeo de introducción (1–2 min)</strong>
      <p>Por qué aparece la tensión en el cuello y cómo podemos aliviarla con movimientos sencillos.</p>
      <VideoPlayer src="https://www.youtube-nocookie.com/embed/xGFa4tM7rkE" title="Entiende tu PAUSA · Cuello" />
      <h3>2. Ponlo en práctica</h3>
      <ul>
        <li><strong>PAUSA sentado.</strong> Secuencia de movilidad (2–3 min).</li>
        <li><strong>PAUSA de pie.</strong> Movilidad y activación (2–3 min).</li>
      </ul>
      <h3>3. Recursos de uso rápido</h3>
      <div className="platform-resource-list">
        <ResourceCard title="Ficha de ejercicios sentado" />
        <ResourceCard title="Ficha de ejercicios de pie" />
      </div>
    </>
  );
}

export default function Movimiento() {
  return (
    <BlockPage area={blocks.movimiento} bodies={{
      espalda: <p>Cambia de postura a lo largo del día y aprovecha las pausas para levantarte y moverte.</p>,
      cuello: <NeckExperience />,
      "piernas-pesadas": <p>Intercala pequeños paseos y cambios de postura durante la jornada.</p>,
      "movimiento-integrado": <p>Aprovecha momentos cotidianos, como una llamada o un trayecto corto, para caminar.</p>,
    }}>
      <BlockHighlights items={[
        ["Pausas activas", "Interrumpe el sedentarismo con movimientos breves.", "#cuello"],
        ["Cuida tu cuerpo", "Reduce la tensión acumulada y mejora tu bienestar.", "#espalda"],
        ["Vida activa", "Integra el movimiento en tu día.", "#movimiento-integrado"],
      ]} />
    </BlockPage>
  );
}
