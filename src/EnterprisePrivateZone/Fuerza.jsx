<<<<<<< HEAD
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
=======

import React from "react";
import {
  Home, Footprints, Dumbbell, Apple, Bed, Smile,
  CalendarCheck, ShieldCheck, SlidersHorizontal,
  TrendingUp, Play, FileText, ChevronRight
} from "lucide-react";
import "./css/PausaBlocks.css";
import { useNavigate } from "react-router-dom";

const base = import.meta.env.BASE_URL;

const forceItems = [
  {
    title: "Tu plan B para seguir entrenando",
    description: "La Receta PAUSA: el entrenamiento esencial que siempre funciona.",
    image: "fuerza.jpeg",
    icon: ShieldCheck,
  },
  {
    title: "Tu entrenamiento, a tu medida",
    description: "Genera tu plan en unos minutos según tus días, nivel y lugar de entrenamiento.",
    image: "movimiento.jpeg",
    icon: SlidersHorizontal,
    href: '/'
  },
  {
    title: "Progresa sin complicarte",
    description: "Aprende a mejorar, adaptar y mantener tu entrenamiento de forma segura y sostenible.",
    image: "fuerza.jpeg",
    icon: TrendingUp,
  },
];

const menu = [
  ["Inicio", Home, "/dashboard"],
  ["Movimiento cotidiano", Footprints, "/movimiento"],
  ["Fuerza y capacidad cardiovascular", Dumbbell, "/fuerza"],
  ["Alimentación", Apple, "/alimentacion"],
  ["CALMA", Bed, "/calma"],
  ["Hábitos y continuidad", CalendarCheck, "/habitos"],
];

function PausaSidebar({ active }) {
  return (
    <aside className="pausa-sidebar">
      <div className="pausa-logo">PAUSA<div /></div>
      <nav>
        {menu.map(([label, Icon, href]) => (
          <a key={label} href={`${base.replace(/\/$/, "")}${href}`}
            className={`pausa-nav ${active === label ? "selected" : ""}`}>
            <Icon size={25}/>
            <span>{label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}

function PausaFooter({ items }) {
  return <footer className="pausa-footer">
    <div className="pausa-footer-title">◈ <strong>Resumen del bloque</strong></div>
    {items.map(({ icon: Icon, title, text }) => (
      <div className="pausa-footer-item" key={title}>
        <Icon size={34}/>
        <div><strong>{title}</strong><span>{text}</span></div>
      </div>
    ))}
  </footer>;
}

export function Fuerza() {
      const navigate = useNavigate();

  return <div className="pausa-layout">
    <PausaSidebar active="Fuerza y capacidad cardiovascular"/>
    <main className="pausa-content">
      <header className="pausa-heading">
        <div className="pausa-heading-icon"><Dumbbell size={38}/></div>
        <div><small>Bloque 2</small><h1>Fuerza y capacidad cardiovascular</h1>
          <p>Entrena de forma inteligente, incluso cuando tienes poco tiempo.</p></div>
      </header>

      <div className="pausa-force-grid">
        <section className="pausa-force-list">
          {forceItems.map(({ title, description, image, icon: Icon, href, onClick }) => (
            <article className="pausa-force-card" key={title} onClick={() => {if(href) {
navigate('/entrenamiento-personalizado')
            }}}>
              <img src={`${base}images/${image}`} alt=""/>
              <div className="pausa-round-icon"><Icon size={34}/></div>
              <div className="pausa-card-copy">
                <h2>{title}</h2><p>{description}</p>
              </div>
              <ChevronRight size={30}/>
            </article>
          ))}
        </section>

        <section className="pausa-example">
          <h2><span>◈</span> Ejemplo de estructura de cada experiencia</h2>
          <p className="pausa-example-subtitle">Ejemplo: “Tu plan B para seguir entrenando”</p>
          <div className="pausa-video-card">
            <div className="pausa-video-placeholder"><Play size={38}/></div>
            <div><h3>1. Entiende tu PAUSA</h3>
              <strong>◷ Vídeo de introducción (3–4 min)</strong>
              <p>Por qué entrenar fuerza y cardio, qué es la Receta PAUSA y cómo encajarla en tu semana.</p></div>
          </div>
          <h3 className="pausa-section-title"><Play size={24}/> 2. Ponlo en práctica</h3>
          <div className="pausa-practice">
            <div><Dumbbell/><strong>Receta PAUSA A/B</strong><span>Sesiones guiadas (20–40 min)</span></div>
            <div><CalendarCheck/><strong>Generador de entrenamientos</strong><span>Crea tu plan según días, nivel y lugar.</span></div>
          </div>
          <h3 className="pausa-section-title"><FileText size={23}/> 3. Recursos de uso rápido</h3>
          <div className="pausa-resources">
            <div><FileText/> Guía de progresión (PDF) ↓</div>
            <div><Dumbbell/> Biblioteca de ejercicios ↓</div>
          </div>
        </section>
      </div>

      <PausaFooter items={[
        {icon: Play,title:"Entrenamiento esencial",text:"La Receta PAUSA, flexible y práctica."},
        {icon: SlidersHorizontal,title:"Plan personalizado",text:"Según tus días, nivel y lugar."},
        {icon: TrendingUp,title:"Progresión segura",text:"Mejora sin complicaciones."},
        {icon: ShieldCheck,title:"Enfoque práctico",text:"Adaptable a tu vida diaria."},
      ]}/>
    </main>
  </div>;
>>>>>>> origin/main
}
