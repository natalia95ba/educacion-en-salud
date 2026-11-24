
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./header.css";

const whatsappMessage =
  "Buenas tardes, me gustaría saber más sobre el programa PAUSA para empresas";

const whatsappUrl = `https://wa.me/644998302?text=${encodeURIComponent(
  whatsappMessage
)}`;


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const navClass = ({ isActive }) =>
    `site-header__link ${isActive ? "active" : ""}`;

  return (
    <header className="site-header">
      <div className="site-header__container">

        {/* LOGO Y MARCA */}
        <Link
          to="/"
          className="site-header__brand"
          onClick={closeMenu}
          aria-label="Educación en Salud - Inicio"
        >
          <img
            src={`/images/logo.png`}
            alt="Educación en Salud"
            className="site-header__logo"
          />

          <span className="site-header__tagline">
            Bienestar práctico
            <br />
            para empresas
            <br />
            y personas
          </span>
        </Link>

        {/* BOTÓN MÓVIL */}
        <button
          type="button"
          className="site-header__mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* NAVEGACIÓN */}
        <nav
          className={`site-header__nav ${
            menuOpen ? "site-header__nav--open" : ""
          }`}
          aria-label="Navegación principal"
        >

          <NavLink
            to="/servicios"
            className={navClass}
            onClick={closeMenu}
          >
            <span>Servicios para empresas</span>
          </NavLink>

          <NavLink
            to="/como-trabajamos"
            className={navClass}
            onClick={closeMenu}
          >
            Cómo trabajamos
          </NavLink>

          <NavLink
            to="/quienes-somos"
            className={navClass}
            onClick={closeMenu}
          >
            Quiénes somos
          </NavLink>

          {/* <Link
            to="/contacto"
            className="site-header__contact"
            onClick={closeMenu}
          >
            Contacto */}

            <a
  className="site-header__contact"
  href={whatsappUrl}
  target="_blank"
  rel="noopener noreferrer"
>
  Contacto
</a>
{/*           </Link>
 */}        </nav>
      </div>
    </header>
  );
}

export default Header;
