<<<<<<< HEAD
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
=======

import React from "react";
import {
  Home, Footprints, Dumbbell, Apple, Bed,
  Smile, CalendarCheck, Utensils, CookingPot,
  ShoppingBasket, ClipboardList, ChevronRight,
  Play, Clock, FileText, Download, Layers, Heart
} from "lucide-react";
import { Link } from "react-router-dom";
import "./css/PausaBlocks.css";

const base = import.meta.env.BASE_URL;

const menu = [
  ["Inicio", Home, "/dashboard"],
  ["Movimiento cotidiano", Footprints, "/movimiento"],
  ["Fuerza y capacidad cardiovascular", Dumbbell, "/fuerza"],
  ["Alimentación", Apple, "/alimentacion"],
  ["Calma", Bed, "/calma"],
  ["Hábitos y continuidad", CalendarCheck, "/habitos"],
];

const experiences = [
  {
    title: "Organiza tus comidas",
    description: "Aprende a planificar tus comidas y a construir platos equilibrados sin complicaciones.",
    image: "images/alimentacion.jpeg",
    icon: Utensils,
  },
  {
    title: "Recetas fáciles y saludables",
    description: "Ideas prácticas, sabrosas y sencillas para incorporar a tu alimentación diaria.",
    image: "images/recetas.jpeg",
    icon: CookingPot,
  },
  {
    title: "Tu compra, más sencilla",
    description: "Organiza la lista de la compra y aprende a elegir alimentos de forma práctica.",
    image: "images/compra.jpeg",
    icon: ShoppingBasket,
  },
];

export default function Alimentacion() {
  return (
    <div className="pausa-layout">
      <aside className="pausa-sidebar">
             <div className="pausa-logo">PAUSA<div/></div>


        <nav>
          {menu.map(([label, Icon, path]) => (
            <Link
              key={path}
              to={path}
              className={`pausa-nav ${path === "/alimentacion" ? "selected" : ""}`}
            >
              <Icon size={25} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="pausa-content">
        <header className="pausa-heading">
          <div className="pausa-heading-icon">
            <Apple size={38} />
          </div>
          <div>
            <small>Bloque 3</small>
            <h1>Alimentación</h1>
            <p>Come mejor, organízate y disfruta cuidándote.</p>
          </div>
        </header>

        <div className="pausa-force-grid">
          <section className="pausa-force-list">
            {experiences.map(({ title, description, image, icon: Icon }) => (
              <article className="pausa-force-card" key={title}>
                <img src={`${base}${image}`} alt="" />
                <div className="pausa-round-icon">
                  <Icon size={34} />
                </div>
                <div className="pausa-card-copy">
                  <h2>{title}</h2>
                  <p>{description}</p>
                </div>
                <ChevronRight size={30} />
              </article>
            ))}
          </section>

          <section className="pausa-example">
            <h2>◈ Ejemplo de estructura de cada experiencia</h2>
            <p className="pausa-example-subtitle">
              Ejemplo: «Organiza tus comidas»
            </p>

            <div className="pausa-video-card">
              <div className="pausa-video-placeholder">
                <Play size={38} />
              </div>
              <div>
                <h3>1. Entiende tu PAUSA</h3>
                <strong><Clock size={16} /> Vídeo de introducción (3–4 min)</strong>
                <p>
                  Descubre cómo organizar tus comidas, construir platos
                  equilibrados y tomar decisiones saludables en tu día a día.
                </p>
              </div>
            </div>

            <h3 className="pausa-section-title">
              <Play size={24} /> 2. Ponlo en práctica
            </h3>

            <div className="pausa-practice">
              <div>
                <Utensils />
                <strong>El plato saludable</strong>
                <span>Aprende a combinar alimentos.</span>
              </div>
              <div>
                <CalendarCheck />
                <strong>Planifica tu semana</strong>
                <span>Organiza menús y comidas.</span>
              </div>
            </div>

            <h3 className="pausa-section-title">
              <FileText size={23} /> 3. Recursos de uso rápido
            </h3>

            <div className="pausa-resources">
              <div>
                <FileText /> Guía del plato saludable ↓
              </div>
              <div>
                <Download /> Planificador semanal ↓
              </div>
            </div>
          </section>
        </div>

        <footer className="pausa-footer">
          <div className="pausa-footer-title">
            ◈ <strong>Resumen del bloque</strong>
          </div>
          <div className="pausa-footer-item">
            <Utensils />
            <div>
              <strong>Platos equilibrados</strong>
              <span>Aprende a combinar alimentos.</span>
            </div>
          </div>
          <div className="pausa-footer-item">
            <CookingPot />
            <div>
              <strong>Recetas prácticas</strong>
              <span>Ideas fáciles para tu día a día.</span>
            </div>
          </div>
          <div className="pausa-footer-item">
            <ClipboardList />
            <div>
              <strong>Organización</strong>
              <span>Planifica y ahorra tiempo.</span>
            </div>
          </div>
          <div className="pausa-footer-item">
            <Heart />
            <div>
              <strong>Flexibilidad</strong>
              <span>Hábitos adaptados a ti.</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
>>>>>>> origin/main
  );
}
