
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ArrowRight,
  UserRound,
  BedDouble,
  Footprints,
  Dumbbell,
  Apple,
  Target,
} from "lucide-react";

import "./Login.css";

export default function LoginEmpresas() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("pausa_token", "fake_token_123");

    navigate("/dashboard");
  };

  const habits = [
    { icon: BedDouble, label: "Descanso y bienestar" },
    { icon: Footprints, label: "Movimiento cotidiano" },
    { icon: Dumbbell, label: "Fuerza y cardio" },
    { icon: Apple, label: "Alimentación" },
    { icon: Target, label: "Hábitos" },
  ];

  return (
    <main className="pausa-login">

      {/* PANEL IZQUIERDO */}
      <section className="pausa-login__welcome">

        <div className="pausa-login__photo" />
        <div className="pausa-login__overlay" />

        <div className="pausa-login__welcome-content">

          <Link to="/" className="pausa-login__brand">
            <div className="pausa-login__brand-symbol">
              <span>☺</span>
            </div>

            <div className="pausa-login__brand-text">
              <strong>PAUSA</strong>
              <span>Educación en Salud</span>
            </div>
          </Link>

          <div className="pausa-login__intro">
            <h1>
              Bienvenido/a
              <br />
              al <span>programa PAUSA</span>
            </h1>

            <div className="pausa-login__underline" />

            <p>
              Tu espacio para cuidar tu salud, con herramientas prácticas,
              flexibles y adaptadas a tu día a día.
            </p>
          </div>

          <div className="pausa-login__habits">
            {habits.map(({ icon: Icon, label }) => (
              <div className="pausa-login__habit" key={label}>
                <div className="pausa-login__habit-icon">
                  <Icon size={34} strokeWidth={2} />
                </div>
                <span>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PANEL DERECHO */}
      <section className="pausa-login__form-panel">

        <div className="pausa-login__decoration pausa-login__decoration--top" />
        <div className="pausa-login__decoration pausa-login__decoration--bottom" />

        <div className="pausa-login__card">

          <div className="pausa-login__user-icon">
            <UserRound size={52} strokeWidth={1.5} />
          </div>

          <header className="pausa-login__header">
            <h2>
              Accede a <span>PAUSA</span>
            </h2>

            <p>
              Entra en tu espacio personal y continúa
              <br className="desktop-break" />
              con el programa.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="pausa-login__form">

            <div className="pausa-login__field">
              <label htmlFor="pausa-email">
                Correo electrónico
              </label>

              <div className="pausa-login__input-wrapper">
                <Mail size={23} />

                <input
                  id="pausa-email"
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                />
              </div>
            </div>

            <div className="pausa-login__field">
              <label htmlFor="pausa-password">
                Contraseña
              </label>

              <div className="pausa-login__input-wrapper">
                <LockKeyhole size={23} />

                <input
                  id="pausa-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Introduce tu contraseña"
                />

                <button
                  type="button"
                  className="pausa-login__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                </button>
              </div>
            </div>

            <div className="pausa-login__options">
              <label className="pausa-login__remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Recordar sesión</span>
              </label>

              <Link
                to="/recuperar-password"
                className="pausa-login__forgot"
              >
                ¿Has olvidado tu contraseña?
              </Link>
            </div>

            <button type="submit" className="pausa-login__submit">
              Entrar a PAUSA
              <ArrowRight size={26} />
            </button>

          </form>

          <footer className="pausa-login__footer">
            <p>
              ¿Necesitas ayuda? Contacta con tu responsable
              <br className="desktop-break" />
              del programa en tu empresa.
            </p>
          </footer>

        </div>
      </section>
    </main>
  );
}
