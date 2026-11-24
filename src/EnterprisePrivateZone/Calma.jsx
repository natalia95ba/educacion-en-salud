<<<<<<< HEAD
import { BlockPage } from "../components/PausaUI";
import { blocks } from "./pausaNavigation";

export function Calma() {
  return (
    <BlockPage area={blocks.calma} bodies={{
      respira: <><strong>Respiración consciente</strong><p>Descubre una práctica guiada, sencilla y adaptable a tu ritmo.</p></>,
      presente: <><strong>Atención plena</strong><p>Descubre cómo convertir algo tan cotidiano en un ejercicio de atención consciente.</p></>,
      tension: <><strong>Relajación muscular</strong><p>Explora la relajación muscular progresiva como técnica para reconocer y soltar la tensión.</p></>,
      cafe: <><strong>Cafeína y energía</strong><p>Conoce las dos caras del café y cómo utilizarlo sin que perjudique tu descanso.</p></>,
      descanso: <><strong>Sueño y recuperación</strong><p>Descubre cómo la luz, los horarios y las decisiones cotidianas influyen en tus ritmos biológicos.</p></>,
    }} />
  );
=======

import React from "react";
import {
  Wind, Leaf, Dumbbell, Coffee, Sunrise, Home,
  Footprints, Apple, Bed, Smile, CalendarCheck,
  ChevronRight
} from "lucide-react";
import "./css/PausaBlocks.css";

const base = import.meta.env.BASE_URL;

const calmItems = [
  {
    number: "01",
    category: "RESPIRACIÓN CONSCIENTE",
    title: "Respira y baja las revoluciones",
    description: "Tu respiración puede ayudarte a encontrar un momento de calma. Descubre una práctica guiada, sencilla y adaptable a tu ritmo.",
    image: "calma.jpeg",
    icon: Wind,
  },
  {
    number: "02",
    category: "ATENCIÓN PLENA",
    title: "Vuelve al presente",
    description: "A veces no necesitas hacer más, sino prestar atención a lo que ya haces. Descubre cómo convertir algo tan cotidiano en un ejercicio de atención consciente.",
    image: "alimentacion.jpeg",
    icon: Leaf,
  },
  {
    number: "03",
    category: "RELAJACIÓN MUSCULAR",
    title: "Suelta la tensión",
    description: "Aprende a reconocer cuándo tus músculos están tensos y a relajarlos voluntariamente mediante técnicas como la relajación muscular progresiva.",
    image: "fuerza.jpeg",
    icon: Dumbbell,
  },
  {
    number: "04",
    category: "CAFEÍNA Y ENERGÍA",
    title: "¿Café o descanso? Tú decides",
    description: "El café puede ser un aliado, pero también puede estar ocultando tu cansancio. Conoce sus dos caras y aprende a utilizarlo sin que perjudique tu descanso.",
    image: "calma.jpeg",
    icon: Coffee,
  },
  {
    number: "05",
    category: "SUEÑO Y RECUPERACIÓN",
    title: "Tu descanso empieza al despertar",
    description: "Dormir mejor no depende únicamente de lo que haces antes de acostarte. Descubre cómo la luz, los horarios y las decisiones cotidianas influyen en tus ritmos biológicos.",
    image: "calma.jpeg",
    icon: Sunrise,
  },
];

const calmMenu = [
  ["Inicio", Home, "/dashboard"],
  ["Movimiento cotidiano", Footprints, "/movimiento"],
  ["Fuerza y capacidad cardiovascular", Dumbbell, "/fuerza"],
  ["Alimentación", Apple, "/alimentacion"],
  ["CALMA", Bed, "/calma"],
  ["Hábitos y continuidad", CalendarCheck, "/habitos"],
];

export function Calma() {
  return <div className="pausa-layout">
    <aside className="pausa-sidebar">
      <div className="pausa-logo">PAUSA<div/></div>
      <nav>{calmMenu.map(([label, Icon, href]) => (
        <a key={label} href={`${base.replace(/\/$/, "")}${href}`}
          className={`pausa-nav ${label === "CALMA" ? "selected" : ""}`}>
          <Icon size={25}/><span>{label}</span>
        </a>
      ))}</nav>
    </aside>

    <main className="pausa-content pausa-calm-content">
      <header className="pausa-calm-heading">
        <div><small>Bloque 4</small><h1>CALMA</h1><div className="pausa-smile-line"/></div>
        <div className="pausa-calm-intro">
          <h2>Baja las revoluciones. Recupera tu equilibrio.</h2>
          <p>Cinco herramientas para cuidarte sin añadir más obligaciones a tu día.</p>
        </div>
      </header>

      <section className="pausa-calm-list">
        {calmItems.map(({number,category,title,description,image,icon:Icon}) => (
          <article className="pausa-calm-card" key={number}>
            <img src={`${base}images/${image}`} alt=""/>
            <div className="pausa-calm-icon"><Icon size={39}/></div>
            <div className="pausa-calm-copy">
              <span>{number} · {category}</span>
              <h2>{title}</h2>
              <p>{description}</p>
            </div>
            <button aria-label={`Abrir ${title}`}><ChevronRight size={30}/></button>
          </article>
        ))}
      </section>
    </main>
  </div>;
>>>>>>> origin/main
}
