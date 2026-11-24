import { BlockHighlights, BlockPage, DashboardCard } from "../components/PausaUI";
import { blocks, deka } from "./pausaNavigation";

export function Habitos() {
  return (
    <BlockPage area={blocks.habitos} bodies={{
      motivacion: <p>¿Qué te importa y para qué quieres cuidarte? Escribe qué te gustaría mantener o recuperar y cómo encaja en tu vida diaria.</p>,
      estrategias: <p>Elige un hábito pequeño, vincúlalo a un momento que ya forme parte de tu rutina y piensa cómo retomarlo si cambian tus planes.</p>,
      cierre: <p>Gracias por recorrer el programa. Quédate con una idea que te haya servido y elige un próximo paso que puedas sostener a tu ritmo.</p>,
    }}>
      <BlockHighlights items={[
        ["Tu motivación", "Recuerda qué es importante para ti."],
        ["Hábitos sostenibles", "Construye rutinas que encajen contigo."],
        ["Próximos pasos", "Sigue avanzando a tu ritmo."],
      ]} />
      <div className="platform-deka-feature"><DashboardCard area={deka} /></div>
    </BlockPage>
  );
}
