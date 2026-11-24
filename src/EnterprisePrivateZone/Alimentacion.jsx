import { BlockHighlights, BlockPage, ResourceCard } from "../components/PausaUI";
import { blocks } from "./pausaNavigation";

function OrganizaTusComidas() {
  return (
    <>
      <h3>1. Entiende tu PAUSA</h3>
      <p>Descubre cómo organizar tus comidas, construir platos equilibrados y tomar decisiones saludables en tu día a día.</p>
      <h3>2. Ponlo en práctica</h3>
      <ul>
        <li><strong>El plato saludable.</strong> Aprende a combinar alimentos.</li>
        <li><strong>Planifica tu semana.</strong> Organiza menús y comidas.</li>
      </ul>
      <h3>3. Recursos de uso rápido</h3>
      <div className="platform-resource-list">
        <ResourceCard title="Guía del plato saludable" />
        <ResourceCard title="Planificador semanal" />
      </div>
    </>
  );
}

export default function Alimentacion() {
  return (
    <BlockPage area={blocks.alimentacion} bodies={{
      organiza: <OrganizaTusComidas />,
      recetas: <p>Explora combinaciones de ingredientes que puedas preparar con facilidad y adaptar a tus gustos.</p>,
      compra: <p>Revisa lo que ya tienes y prepara la lista de la compra a partir de las comidas que has previsto.</p>,
      "batch-cooking": <p>Elige preparaciones que puedas combinar durante la semana y organiza por adelantado qué quieres dejar listo.</p>,
      estrategias: <p>Empieza por una decisión que puedas simplificar, como dejar la lista de la compra preparada o planificar las comidas de los días más ocupados.</p>,
    }}>
      <BlockHighlights items={[
        ["Platos equilibrados", "Aprende a combinar alimentos."],
        ["Recetas prácticas", "Ideas fáciles para tu día a día."],
        ["Organización", "Planifica y ahorra tiempo."],
        ["Flexibilidad", "Hábitos adaptados a ti."],
      ]} />
    </BlockPage>
  );
}
