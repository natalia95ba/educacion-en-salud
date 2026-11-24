<<<<<<< HEAD
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
=======

import React from "react";
import {
  Home,
  Footprints,
  Dumbbell,
  Apple,
  Bed,
  Smile,
  CalendarCheck,
  ChevronRight,
} from "lucide-react";
import "./css/PausaBlocks.css";

const base = import.meta.env.BASE_URL;

const areas = [
  {
    title: "Movimiento cotidiano",
    image: "movimiento.jpeg",
    icon: Footprints,
    href: "/movimiento",
  },
  {
    title: "Fuerza y capacidad cardiovascular",
    image: "fuerza.jpeg",
    icon: Dumbbell,
    href: "/fuerza",
  },
  {
    title: "Alimentación",
    image: "alimentacion.jpeg",
    icon: Apple,
    href: "/alimentacion",
  },
  {
    title: "Descanso",
    image: "calma.jpeg",
    icon: Bed,
    href: "/descanso",
  },
  {
    title: "Bienestar emocional",
    image: "calma.jpeg",
    icon: Smile,
    href: "/bienestar-emocional",
  },
  {
    title: "Hábitos saludables",
    image: "habitos.jpeg",
    icon: CalendarCheck,
    href: "/habitos",
  },
];

const menu = [
  ["Inicio", Home, "/dashboard"],
  ["Movimiento cotidiano", Footprints, "/movimiento"],
  ["Fuerza y capacidad cardiovascular", Dumbbell, "/fuerza"],
  ["Alimentación", Apple, "/alimentacion"],
  ["Descanso", Bed, "/descanso"],
  ["Bienestar emocional", Smile, "/bienestar-emocional"],
  ["Hábitos y continuidad", CalendarCheck, "/habitos"],
];

export default function AreasPage() {
  return (
    <div className="pausa-layout">
      <aside className="pausa-sidebar">
        <div className="pausa-logo">
          PAUSA
          <div />
        </div>

        <nav>
          {menu.map(([label, Icon, href]) => (
            <a
              key={label}
              href={`${base.replace(/\/$/, "")}${href}`}
              className={`pausa-nav ${
                label === "Inicio" ? "selected" : ""
              }`}
            >
              <Icon size={24} />
              <span>{label}</span>
            </a>
          ))}
        </nav>
      </aside>

      <main className="pausa-content areas-page">
        <header className="areas-topbar">
          <div className="areas-brand">
            <img
              src={`${base}images/logo.png`}
              alt="Educación en Salud"
            />
            <div className="areas-brand-divider" />
            <div className="areas-brand-text">
              <strong>PAUSA</strong>
              <span>Plataforma de educación en salud para empresas</span>
            </div>
          </div>

          <div className="areas-topbar-icons">
            <a href={`${base}dashboard`} aria-label="Inicio">
              <Home size={27} />
            </a>
            <a href="#" aria-label="Vídeos">
              <span>▶</span>
            </a>
            <a href="#" aria-label="Biblioteca">
              <span>▤</span>
            </a>
            <a href="#" aria-label="Favoritos">
              <span>♡</span>
            </a>
          </div>
        </header>

        <section className="areas-content">
          <div className="areas-heading">
            <span className="areas-eyebrow">
              TU BIENESTAR, A TU RITMO
            </span>

            <h1>Elige el área que más te interese</h1>

            <p>
              Descubre contenidos y herramientas para mejorar tu salud
              y bienestar en tu día a día.
            </p>

            <span className="areas-heading-decoration" />
          </div>

          <div className="areas-grid">
            {areas.map(({ title, image, icon: Icon, href }) => (
              <a
                className="area-card"
                href={`${base.replace(/\/$/, "")}${href}`}
                key={title}
              >
                <div className="area-card-image">
                  <img
                    src={`${base}images/${image}`}
                    alt={title}
                  />
                </div>

                <div className="area-card-content">
                  <div className="area-card-icon">
                    <Icon size={39} strokeWidth={2} />
                  </div>

                  <h2>{title}</h2>

                  <div className="area-card-arrow">
                    <ChevronRight size={29} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
>>>>>>> origin/main
    </div>
  );
}
