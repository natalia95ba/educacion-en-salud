
import React from "react";
import {
  MessageCircle,
  ClipboardCheck,
  CalendarCheck,
  ChartNoAxesCombined,
  ArrowRight,
} from "lucide-react";

import { Header } from "../components/Header";
import "./css/ComoTrabajamos.css";
import { Footer } from "../components/Footer";

const whatsappMessage =
  "Buenas tardes, me gustaría solicitar una reunión gratuita";

const whatsappUrl = `https://wa.me/644998302?text=${encodeURIComponent(
  whatsappMessage
)}`;

const steps = [
  {
    number: "1",
    title: "Nos conocemos",
    description:
      "Comenzamos con una reunión inicial gratuita y sin compromiso para escuchar tus necesidades, objetivos y contexto.",
    icon: MessageCircle,
  },
  {
    number: "2",
    title: "Diseñamos una propuesta",
    description:
      "Seleccionamos las experiencias y herramientas que mejor encajan con las características y necesidades de tu equipo.",
    icon: ClipboardCheck,
  },
  {
    number: "3",
    title: "Lo llevamos a la práctica",
    description:
      "Acordamos el formato, la organización y el calendario de las actividades para facilitar la participación del equipo.",
    icon: CalendarCheck,
  },
  {
    number: "4",
    title: "Evaluamos y acompañamos",
    description:
      "Valoramos el desarrollo y los resultados, recogemos la experiencia del equipo y, si lo deseas, te proponemos próximos pasos.",
    icon: ChartNoAxesCombined,
  },
];

function Hero() {
  return (
    <section className="work-hero">
      <div className="work-hero-image">
        <img
          src={`/images/talleres-bienestar.jpeg`}
          alt="Espacio de trabajo preparado para una reunión"
        />
      </div>

      <div className="work-hero-content">
        <span className="work-eyebrow">CÓMO TRABAJAMOS</span>

        <h1>
          Cada empresa es diferente.
          <br />
          Nuestra propuesta también.
        </h1>

        <div className="work-underline" />

        <p>
          Te acompañamos desde el primer contacto hasta la puesta en marcha,
          con una propuesta práctica, cercana y adaptada a la realidad de tu
          equipo.
        </p>
      </div>
    </section>
  );
}

function WorkSteps() {
  return (
    <section className="work-steps-section">
      <div className="work-steps-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article className="work-step" key={step.number}>
              <div className="work-step-visual">
                <div className="work-step-icon">
                  <Icon size={65} strokeWidth={1.5} />
                </div>

                {index !== steps.length - 1 && (
                  <div className="work-step-connector">
                    <span />
                  </div>
                )}
              </div>

              <div className="work-step-heading">
                <span className="work-step-number">{step.number}</span>

                <h2>{step.title}</h2>
              </div>

              <p className="work-step-description">
                {step.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function WorkContact() {
  return (
    <section className="work-contact-section">
      <div className="work-contact-decoration">
        <span />
        <span />
        <span />
      </div>

      <a   href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer" className="work-contact-button">
        <CalendarCheck size={43} strokeWidth={1.8} />

        <span>Solicitar reunión gratuita</span>

        <ArrowRight size={32} strokeWidth={2} />
      </a>
    </section>
  );
}

export default function ComoTrabajamos() {
  return (
    <div className="work-page">
      <Header />

      <main>
        <Hero />
        <WorkSteps />
        <WorkContact />
      </main>
      <Footer/>
    </div>
  );
}
