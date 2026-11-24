
import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ArrowRight } from "lucide-react";
import "./Footer.css";
import { isFeatureFlagAllowed } from "../utils/featureflag";

const whatsappMessage =
  "Buenas tardes, me gustaría saber más sobre el programa PAUSA para empresas";

const whatsappUrl = `https://wa.me/644998302?text=${encodeURIComponent(
  whatsappMessage
)}`;

export function Footer() {
  return (
    <footer className="site-footer">

      {/* BLOQUE DE CONTACTO */}
      <section className="footer-cta">
        <div className="footer-cta-content">

          <div className="footer-cta-icon">
            <MessageCircle size={88} strokeWidth={1.5} />
          </div>

          <div className="footer-cta-divider" />

          <div className="footer-cta-text">
            <h2>Cuéntanos qué necesita tu equipo</h2>
            <p>
              Hablemos de tu empresa, tus objetivos y cómo
              podemos ayudaros.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="footer-cta-button"
          >
            Contactar
            <ArrowRight size={30} strokeWidth={2} />
          </a>

        </div>
      </section>

      {/* ENLACES LEGALES */}
      <div className="footer-bottom">
        <span className="footer-copyright">
          © {new Date().getFullYear()} Educación en Salud.
          Todos los derechos reservados.
        </span>

        <nav className="footer-legal-links">
          <Link to="/aviso-legal">
            Aviso legal
          </Link>

          <Link to="/politica-de-privacidad">
            Política de privacidad
          </Link>

          <Link to="/condiciones-del-servicio">
            Condiciones del servicio
          </Link>
        </nav>
        {isFeatureFlagAllowed() &&    <a
  className="site-header__contact"
  href={'/login-clientes'}
  target="_blank"
  rel="noopener noreferrer"
>
  Soy Empresa
</a>}
      </div>

    </footer>
  );
}
