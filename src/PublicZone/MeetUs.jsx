
import React from "react";
import {
  Dumbbell,
  Apple,
  Mail,
  ArrowRight,
  Award,
  Users,
  Target,
} from "lucide-react";

import "./css/QuienesSomos.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export default function QuienesSomos() {
  return (
    <div className="about-page">

      {/* CABECERA */}
      <Header/>

      {/* PRESENTACIÓN */}
      <main>
        <section className="about-hero">

          <div className="about-photo">
            <img
              src={`/images/juanma-desire.jpeg`}
              alt="Juanma Jiménez y Desiré Flores"
            />
          </div>

          <div className="about-information">

            <span className="about-eyebrow">
              QUIÉNES SOMOS
            </span>

            <h1>Somos Juanma y Desiré</h1>

            <div className="about-underline" />

            <p className="about-intro">
              Dos profesionales con trayectorias diferentes,
              pero con una misma convicción: cuidar de la salud
              debería ser más sencillo y compatible con la vida real.
            </p>

            <div className="about-person">

              <div className="about-person-icon">
                <Dumbbell size={43} />
              </div>

              <div className="about-person-divider" />

              <div>
                <h2>Juanma Jiménez</h2>
                <p>
                  Graduado en Ciencias de la Actividad Física
                  y del Deporte, docente y especialista en
                  ejercicio físico y salud.
                </p>
              </div>

            </div>

            <div className="about-person">

              <div className="about-person-icon">
                <Apple size={43} />
              </div>

              <div className="about-person-divider" />

              <div>
                <h2>Desiré Flores</h2>
                <p>
                  Educadora social y técnica superior en
                  Dietética, con experiencia en educación,
                  acompañamiento a personas y alimentación.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* FRANJA INFERIOR */}
        <section className="about-bottom">

          <div className="about-bottom-heading">
            <h2>
              Nuestra forma
              <br />
              de trabajar
            </h2>
            <span />
          </div>

          <div className="about-bottom-description">
            Unimos nuestra experiencia en ejercicio físico,
            educación y alimentación para diseñar propuestas
            de bienestar cercanas, realistas y adaptadas
            a cada empresa.
          </div>

          <div className="about-values">

            <p>Una mirada</p>
            <h3>
              Rigurosa, cercana y útil
            </h3>

            <div className="about-values-items">

              <div>
                <Award size={38} />
                <strong>Rigurosa</strong>
              </div>

              <div>
                <Users size={38} />
                <strong>Cercana</strong>
              </div>

              <div>
                <Target size={38} />
                <strong>Útil</strong>
              </div>

            </div>
          </div>

        </section>
      </main>
            <Footer/>
      
    </div>
  );
}
