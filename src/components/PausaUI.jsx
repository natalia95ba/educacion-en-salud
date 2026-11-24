import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronRight, Download, FileText } from "lucide-react";
import { imageUrl } from "../EnterprisePrivateZone/pausaNavigation";

export function Button({ children, className = "", ...props }) {
  return <button type="button" className={`platform-button ${className}`} {...props}>{children}</button>;
}

export function SelectField(props) {
  return <select {...props} className={`platform-select ${props.className ?? ""}`} />;
}

export function BlockHeader({ area, label }) {
  const Icon = area.icon;
  return (
    <header className="platform-hero">
      <div className="platform-hero-media" aria-hidden="true">
        <div><img src={imageUrl(area.image)} alt="" /></div>
      </div>
      <div className="platform-hero-icon"><Icon aria-hidden="true" /></div>
      <div className="platform-hero-copy">
        <span>{label ?? `Bloque ${area.number}`}</span>
        <h1>{area.title}</h1>
        <p>{area.subtitle}</p>
      </div>
    </header>
  );
}

function CardContent({ title, description, image, icon: Icon }) {
  return (
    <>
      <img className="platform-card-photo" src={imageUrl(image)} loading="lazy" alt="" />
      <span className="platform-card-icon"><Icon aria-hidden="true" /></span>
      <span className="platform-card-copy"><strong>{title}</strong><span>{description}</span></span>
    </>
  );
}

export function DashboardCard({ area }) {
  return (
    <Link to={area.path} className="platform-card platform-dashboard-card">
      <CardContent {...area} description={area.subtitle} />
      <span className="platform-arrow"><ChevronRight aria-hidden="true" /></span>
    </Link>
  );
}

export function Disclosure({ summary, children, detailRef, ...props }) {
  return <details ref={detailRef} {...props}><summary>{summary}</summary>{children}</details>;
}

function ModuleAccordion({ module, children }) {
  const [id, title, description, image, icon] = module;
  const detailRef = useRef(null);
  const { hash, key } = useLocation();

  useEffect(() => {
    const details = detailRef.current;
    if (hash !== `#${id}` || !details) return;
    details.open = true;
    details.querySelector("summary").focus({ preventScroll: true });
    details.scrollIntoView({ block: "start" });
  }, [hash, id, key]);

  return (
    <Disclosure detailRef={detailRef} id={id} className="platform-card platform-module"
      summary={<>
        <CardContent title={title} description={description} image={image} icon={icon} />
        <span className="platform-arrow"><ChevronDown aria-hidden="true" /></span>
      </>}>
      <div className="platform-module-body">{children}</div>
    </Disclosure>
  );
}

export function BlockPage({ area, bodies, children, label }) {
  return (
    <div className={`platform-content ${label ? "platform-complement" : ""}`}>
      <BlockHeader area={area} label={label} />
      <section className="platform-modules" aria-label={`Apartados de ${area.title}`}>
        {area.modules.map((module) => (
          <ModuleAccordion key={module[0]} module={module}>{bodies[module[0]]}</ModuleAccordion>
        ))}
      </section>
      {children}
    </div>
  );
}

export function VideoPlayer({ src, title }) {
  return <iframe className="platform-video" src={src} title={title} loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen />;
}

export function ResourceCard({ title, href, onDownload }) {
  if (href) return <a className="platform-resource platform-button" href={href} download><Download aria-hidden="true" />{title}</a>;
  if (onDownload) return <Button className="platform-resource" onClick={onDownload}><Download aria-hidden="true" />{title}</Button>;
  return <div className="platform-resource"><FileText aria-hidden="true" /><span>{title}<small>Recurso pendiente</small></span></div>;
}

export function BlockHighlights({ items, title = "Resumen del bloque" }) {
  return (
    <section className="platform-highlights" aria-label={title}>
      <h2>{title}</h2>
      {items.map(([heading, text, target]) => {
        const copy = <><strong>{heading}</strong><span>{text}</span></>;
        return target ? <Link key={heading} to={target}>{copy}<ChevronRight aria-hidden="true" /></Link>
          : <div key={heading}>{copy}</div>;
      })}
    </section>
  );
}
