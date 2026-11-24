<<<<<<< HEAD
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
=======

import React from "react";
import {
  Home, Footprints, Dumbbell, Apple, Bed, Smile,
  CalendarCheck, Flag, Settings, Rocket, ChevronRight
} from "lucide-react";
import "./css/PausaBlocks.css";

const base = import.meta.env.BASE_URL;

const habitItems = [
  {
    title: "¿Para qué quieres sentirte bien?",
    description: "Reflexiona sobre tus motivos, lo que te importa y define tu “Roma” personal.",
    image: "habitos.jpeg",
    icon: Flag,
  },
  {
    title: "Estrategias para mantener tus hábitos",
    description: "Herramientas sencillas y eficaces para construir, sostener y retomar tus hábitos en el día a día.",
    image: "calma.jpeg",
    icon: Settings,
  },
  {
    title: "Y por último...",
    description: "Una breve reflexión final, ideas clave y próximos pasos para seguir cuidándote.",
    image: "talleres-bienestar.jpeg",
    icon: Rocket,
  },
];

const habitMenu = [
  ["Inicio", Home, "/dashboard"],
  ["Movimiento cotidiano", Footprints, "/movimiento"],
  ["Fuerza y capacidad cardiovascular", Dumbbell, "/fuerza"],
  ["Alimentación", Apple, "/alimentacion"],
  ["CALMA", Bed, "/calma"],
  ["Hábitos y continuidad", CalendarCheck, "/habitos"],
];

export function Habitos() {
  return <div className="pausa-layout">
    <aside className="pausa-sidebar">
      <div className="pausa-logo">PAUSA<div/></div>
      <nav>{habitMenu.map(([label, Icon, href]) => (
        <a key={label} href={`${base.replace(/\/$/, "")}${href}`}
          className={`pausa-nav ${label === "Hábitos y continuidad" ? "selected" : ""}`}>
          <Icon size={25}/><span>{label}</span>
        </a>
      ))}</nav>
    </aside>

    <main className="pausa-content pausa-habits-content">
      <header className="pausa-heading">
        <div className="pausa-heading-icon"><CalendarCheck size={38}/></div>
        <div><small>Bloque 6</small>
          <h1>Hábitos y continuidad</h1>
          <p>Pequeños pasos. Grandes cambios que perduran.</p></div>
      </header>

      <section className="pausa-habits-list">
        {habitItems.map(({title,description,image,icon:Icon}) => (
          <article className="pausa-habit-card" key={title}>
            <img src={`${base}images/${image}`} alt=""/>
            <div className="pausa-habit-icon"><Icon size={48}/></div>
            <div className="pausa-habit-copy">
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <button aria-label={`Abrir ${title}`}><ChevronRight size={38}/></button>
          </article>
        ))}
      </section>

      <footer className="pausa-footer">
        <div className="pausa-footer-title">◈ <strong>Resumen del bloque</strong></div>
        <div className="pausa-footer-item"><Flag/><div><strong>Tu motivación</strong><span>Recuerda qué es importante para ti.</span></div></div>
        <div className="pausa-footer-item"><Settings/><div><strong>Hábitos sostenibles</strong><span>Construye rutinas que encajen contigo.</span></div></div>
        <div className="pausa-footer-item"><Rocket/><div><strong>Próximos pasos</strong><span>Sigue avanzando a tu ritmo.</span></div></div>
      </footer>
    </main>
  </div>;
>>>>>>> origin/main
}
