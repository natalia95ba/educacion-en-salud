
import React from "react";
import {
  ChevronDown,
  ArrowRight,
  Mail,
  Armchair,
  Dumbbell,
  Apple,
  Flower2,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";

import "./css/Servicios.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const whatsappMessage =
  "Buenas tardes, me gustaría solicitar una reunión gratuita";

const whatsappUrl = `https://wa.me/644998302?text=${encodeURIComponent(
  whatsappMessage
)}`;

const services = [
  {
    title: "Movimiento cotidiano",
    icon: Armchair,
    image: `/images/movimiento.jpeg`,
    link: "/movimiento",
  },
  {
    title: "Fuerza y capacidad cardiovascular",
    icon: Dumbbell,
    image: `/images/fuerza.jpeg`,
    link: "/fuerza",
  },
  {
    title: "Alimentación",
    icon: Apple,
    image: `/images/alimentacion.jpeg`,
    link: "/alimentacion",
  },
  {
    title: "Calma y descanso",
    icon: Flower2,
    image: `/images/calma.jpeg`,
    link: "/calma",
  },
  {
    title: "Hábitos",
    icon: CalendarCheck,
    image: `/images/habitos.jpeg`,
    link: "/habitos",
  },
];


function Hero() {

  const whatsappMessage =
  "Buenas tardes, me gustaría conocer vuestras propuestas";

const whatsappUrl = `https://wa.me/644998302?text=${encodeURIComponent(
  whatsappMessage
)}`;

  return (
    <section className="services-hero">
      <div className="services-hero-image">
        <img
          src={`/images/enterprise-hero.jpeg`}
          alt="Personas participando en una reunión de trabajo"
        />
      </div>

      <div className="services-hero-content">
        <h1>
          ¿Qué podemos ofrecer
          <br />
          a tu empresa?
        </h1>

        <div className="services-underline" />

        <p>
          Talleres y experiencias de bienestar
          <br className="services-desktop-break" />
          adaptados a las necesidades de cada
          <br className="services-desktop-break" />
          organización.
        </p>

        <a href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"  className="services-primary-button">
          Conocer nuestras propuestas
          <ArrowRight size={23} />
        </a>
      </div>
    </section>
  );
}

function ServiceCards() {
  return (
    <section className="services-cards-section" id="propuestas">
      <div className="services-cards-grid">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <a
              href={service.link}
              className="services-card"
              key={service.title}
            >
              <div className="services-card-top">
                <div className="services-card-icon">
                  <Icon size={37} strokeWidth={1.7} />
                </div>

                <h2>{service.title}</h2>
              </div>

              <div className="services-card-image">
                <img src={service.image} alt={service.title} />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function Introduction() {
  return (
    <section className="services-introduction">
      <div className="services-intro-image">
        <img
          src={`/images/talleres-bienestar.jpeg`}
          alt="Espacio de trabajo con ordenador y botella de agua"
        />
      </div>

      <div className="services-intro-decoration" />

      <div className="services-intro-content">
        <h2>
          Talleres y experiencias de bienestar
          <span> prácticas, cercanas y aplicables</span>
        </h2>

        <p>
          Diseñamos propuestas dinámicas y participativas para acercar
          la educación en salud al entorno laboral, con un enfoque
          realista, flexible y adaptado a vuestro equipo.
        </p>
      </div>
    </section>
  );
}

export default function Servicios() {
  return (
    <div className="services-page">
      <Header />

      <main>
        <Hero />
        <ServiceCards />
        <Introduction />
      </main>
      <Footer/>
    </div>
  );
}
