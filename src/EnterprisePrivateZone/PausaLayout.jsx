import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { areas, deka, home, imageUrl } from "./pausaNavigation";
import "./css/PausaPlatform.css";

function AreaLink({ area, onNavigate, className = "" }) {
  const Icon = area.icon;
  return (
    <NavLink className={`platform-nav-link ${className}`} end to={area.path} onClick={onNavigate}>
      <Icon aria-hidden="true" /> <span>{area.title}</span>
    </NavLink>
  );
}

function Sidebar({ open, onNavigate, sidebarRef }) {
  const { pathname, hash } = useLocation();
  const currentArea = areas.find(({ path, childPath }) => path === pathname || childPath === pathname);
  const [groups, setGroups] = useState({});
  const groupIsOpen = (path) => groups[path] ?? (currentArea?.path === path);

  useEffect(() => {
    if (currentArea) setGroups((previous) => ({ ...previous, [currentArea.path]: true }));
  }, [currentArea, hash]);

  return (
    <aside ref={sidebarRef} id="platform-sidebar" className={`platform-sidebar ${open ? "is-open" : ""}`}>
      <Link to={home.path} className="platform-sidebar-brand" aria-label="PAUSA · Inicio" onClick={onNavigate}>
        <img src={imageUrl("pausa-logo-blanco.svg")} alt="PAUSA · Educación en Salud" />
      </Link>
      <nav aria-label="Áreas de bienestar" className="platform-nav">
        <AreaLink area={home} onNavigate={onNavigate} />
        {areas.map((area) => {
          const expanded = groupIsOpen(area.path);
          const id = `nav-${area.number}`;
          return (
            <div key={area.path}>
              <div className={`platform-nav-group ${currentArea === area ? "is-current" : ""}`}>
                <AreaLink area={area} onNavigate={onNavigate} />
                <button className="platform-nav-toggle" type="button"
                  aria-label={`Apartados de ${area.title}`} aria-expanded={expanded} aria-controls={id}
                  onClick={() => setGroups((previous) => ({ ...previous, [area.path]: !expanded }))}>
                  <ChevronDown aria-hidden="true" />
                </button>
              </div>
              <ul id={id} className="platform-subnav" hidden={!expanded}>
                {area.modules.map(([moduleId, title]) => {
                  const destination = `#${moduleId}`;
                  return <li key={moduleId}><Link to={area.path + destination} onClick={onNavigate}
                    aria-current={pathname === area.path && hash === destination ? "location" : undefined}>{title}</Link></li>;
                })}
              </ul>
            </div>
          );
        })}
        <div className="platform-deka-nav"><AreaLink area={deka} onNavigate={onNavigate} /></div>
      </nav>
    </aside>
  );
}

function Header({ open, onToggle, menuRef }) {
  return (
    <header className="platform-header">
      <button type="button" ref={menuRef} className="platform-menu-button" aria-controls="platform-sidebar"
        aria-expanded={open} aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={onToggle}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <img src={imageUrl("logo.png")} alt="Educación en Salud" />
      <div className="platform-header-copy">
        <strong>PAUSA</strong>
        <span>Plataforma de educación en salud para empresas</span>
      </div>
    </header>
  );
}

export default function PausaLayout() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const sidebarRef = useRef(null);
  const mainRef = useRef(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  useEffect(() => {
    if (open) sidebarRef.current?.querySelector(".platform-nav a")?.focus();
  }, [open]);

  function closeMenu(restoreFocus) {
    setOpen(false);
    if (open && restoreFocus) menuRef.current?.focus();
  }

  return (
    <div className="platform" onKeyDown={(event) => {
      if (event.key === "Escape" && open) closeMenu(true);
    }}>
      <a className="platform-skip" href="#pausa-main" onClick={(event) => {
        event.preventDefault();
        mainRef.current?.focus();
      }}>Saltar al contenido</a>
      <Header open={open} onToggle={() => setOpen(!open)} menuRef={menuRef} />
      <Sidebar open={open} onNavigate={() => closeMenu(true)} sidebarRef={sidebarRef} />
      <main ref={mainRef} id="pausa-main" tabIndex={-1} className="platform-main">
        <Outlet />
      </main>
    </div>
  );
}
