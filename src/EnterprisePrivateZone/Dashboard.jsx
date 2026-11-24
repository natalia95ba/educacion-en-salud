import { DashboardCard } from "../components/PausaUI";
import { areas, deka } from "./pausaNavigation";

export default function Dashboard() {
  return (
    <div className="platform-content">
      <header className="platform-intro">
        <strong>TU BIENESTAR, A TU RITMO</strong>
        <h1>Elige el área que más te interese</h1>
        <p>Descubre contenidos y herramientas para mejorar tu salud y bienestar en tu día a día.</p>
      </header>
      <section className="platform-dashboard-grid" aria-label="Áreas de bienestar y reto complementario">
        {[...areas, deka].map((area) => <DashboardCard key={area.path} area={area} />)}
      </section>
    </div>
  );
}
