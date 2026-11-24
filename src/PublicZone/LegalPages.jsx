
import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  Scale,
  ShieldCheck,
  FileText,
  Mail,
  MapPin,
  ChevronRight,
} from "lucide-react";
import "./css/LegalPages.css";

const legalPages = {
  "aviso-legal": {
    title: "Aviso legal",
    subtitle: "Información sobre el responsable y las condiciones de uso de nuestra web.",
    icon: Scale,
    intro:
      "En este apartado encontrarás la información relativa al titular de esta web, las condiciones de utilización y las responsabilidades asociadas a sus contenidos.",
    sections: [
      {
        title: "1. Identificación del responsable",
        paragraphs: [
          "En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico, se informa de los siguientes datos:",
        ],
        list: [
          "Titulares: Juan Manuel Jiménez González y Desiré Flores Partido.",
          "Domicilio: Calle San Pedro, 38 – Antequera, Málaga.",
          "Actividad profesional: Ciencias de la Actividad Física y del Deporte, Educación Social y Dietética.",
        ],
      },
      {
        title: "2. Finalidad de la página web",
        paragraphs: [
          "Esta web tiene como finalidad proporcionar información sobre nuestra actividad profesional, presentar nuestros servicios y propuestas de bienestar y facilitar el contacto con personas y organizaciones interesadas.",
        ],
      },
      {
        title: "3. Condiciones de utilización",
        paragraphs: [
          "El usuario se compromete a utilizar esta web, sus servicios y contenidos de conformidad con la legislación vigente, la buena fe y el orden público.",
          "Queda prohibida cualquier utilización ilícita, fraudulenta o que pueda perjudicar la imagen, los intereses o los derechos de Educación en Salud o de terceros, así como cualquier actuación que pueda impedir el funcionamiento normal del sitio.",
        ],
      },
      {
        title: "4. Propiedad intelectual e industrial",
        paragraphs: [
          "Los contenidos de esta web, incluyendo textos, fotografías, materiales audiovisuales, diseños, estructura y demás elementos, están protegidos por los correspondientes derechos de propiedad intelectual e industrial.",
          "No está permitida su reproducción, distribución, transformación o utilización con fines comerciales sin la autorización previa de sus legítimos titulares, salvo en los casos legalmente permitidos.",
        ],
      },
      {
        title: "5. Protección de datos",
        paragraphs: [
          "El tratamiento de los datos personales facilitados por los usuarios se realizará conforme a nuestra Política de Privacidad.",
          "Los usuarios podrán ejercer los derechos que les reconoce la normativa vigente en materia de protección de datos mediante los canales de contacto indicados en esta web.",
        ],
      },
      {
        title: "6. Enlaces externos",
        paragraphs: [
          "Esta web puede incluir enlaces a páginas de terceros. Educación en Salud no controla sus contenidos ni garantiza su disponibilidad, exactitud o legalidad.",
        ],
      },
      {
        title: "7. Exclusión de garantías y responsabilidad",
        paragraphs: [
          "No se garantiza la disponibilidad permanente de la web ni la ausencia de errores técnicos. Se adoptarán medidas razonables para mantener su funcionamiento y seguridad.",
        ],
      },
      {
        title: "8. Legislación aplicable y jurisdicción",
        paragraphs: [
          "Las relaciones entre los titulares de esta web y sus usuarios se regirán por la legislación española, sin perjuicio de los derechos que correspondan a los consumidores y usuarios conforme a la normativa aplicable.",
        ],
      },
      {
        title: "9. Contacto",
        paragraphs: [
          "Para cualquier consulta relacionada con este aviso legal puedes contactar con nosotros a través de los medios indicados en la sección de contacto.",
        ],
      },
    ],
  },

  "politica-de-privacidad": {
    title: "Política de privacidad",
    subtitle: "Cómo tratamos y protegemos tus datos personales.",
    icon: ShieldCheck,
    intro:
      "En Educación en Salud consideramos que tu privacidad es importante. En esta política explicamos qué información podemos recoger, con qué finalidad y qué derechos tienes sobre tus datos.",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        paragraphs: [
          "Responsables: Juan Manuel Jiménez González y Desiré Flores Partido.",
          "Correo electrónico: info@educacionensalud.es.",
          "Web: https://educacionensalud.es.",
        ],
      },
      {
        title: "2. Datos personales que podemos recoger",
        paragraphs: [
          "Podemos tratar los datos que nos facilites voluntariamente a través de formularios de contacto, solicitudes de información o comunicaciones directas.",
        ],
        list: [
          "Datos identificativos, como nombre y apellidos.",
          "Datos de contacto, como correo electrónico y teléfono.",
          "Información incluida en los mensajes que nos envíes.",
          "Información técnica de navegación, cuando corresponda.",
        ],
      },
      {
        title: "3. Finalidad del tratamiento",
        paragraphs: [
          "Los datos personales podrán utilizarse para:",
        ],
        list: [
          "Atender consultas y solicitudes de información.",
          "Gestionar la relación profesional con clientes y empresas.",
          "Organizar y prestar los servicios contratados.",
          "Enviar comunicaciones comerciales cuando exista una base legal que lo permita.",
          "Mantener la seguridad y el correcto funcionamiento de la web.",
        ],
      },
      {
        title: "4. Legitimación",
        paragraphs: [
          "El tratamiento de los datos se basará, según el caso, en el consentimiento del interesado, la aplicación de medidas precontractuales, la ejecución de un contrato o el cumplimiento de obligaciones legales.",
        ],
      },
      {
        title: "5. Conservación de los datos",
        paragraphs: [
          "Los datos se conservarán durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y durante los plazos exigidos por la normativa aplicable.",
        ],
      },
      {
        title: "6. Comunicación de datos a terceros",
        paragraphs: [
          "No venderemos tus datos personales. Podrán intervenir proveedores tecnológicos que necesiten acceder a determinados datos para prestar servicios relacionados con el funcionamiento de la web o la actividad profesional, bajo las garantías correspondientes.",
        ],
      },
      {
        title: "7. Derechos de los usuarios",
        paragraphs: [
          "Puedes ejercer los siguientes derechos en relación con tus datos personales:",
        ],
        list: [
          "Acceso: conocer qué datos personales tratamos.",
          "Rectificación: corregir datos inexactos.",
          "Supresión: solicitar su eliminación cuando proceda.",
          "Oposición: oponerte a determinados tratamientos.",
          "Limitación: solicitar que se limite el tratamiento.",
          "Portabilidad: recibir tus datos en los supuestos previstos legalmente.",
          "Retirar el consentimiento cuando el tratamiento se base en él.",
        ],
      },
      {
        title: "8. Cómo ejercer tus derechos",
        paragraphs: [
          "Puedes enviar tu solicitud a info@educacionensalud.es, indicando el derecho que deseas ejercer y aportando la información necesaria para verificar tu identidad.",
          "También puedes presentar una reclamación ante la Agencia Española de Protección de Datos si consideras que tus derechos no han sido atendidos correctamente.",
        ],
      },
      {
        title: "9. Seguridad",
        paragraphs: [
          "Adoptamos medidas técnicas y organizativas razonables para proteger los datos personales frente a accesos no autorizados, pérdida, alteración o divulgación.",
        ],
      },
      {
        title: "10. Cookies y servicios de terceros",
        paragraphs: [
          "La web puede utilizar cookies técnicas, analíticas y de terceros. Las cookies no necesarias estarán sujetas al consentimiento del usuario cuando así lo exija la normativa.",
          "La información detallada sobre las cookies utilizadas y su configuración deberá estar disponible en la correspondiente política de cookies.",
        ],
      },
      {
        title: "11. Modificaciones",
        paragraphs: [
          "Esta política podrá actualizarse para reflejar cambios en la actividad, los tratamientos de datos o la normativa aplicable.",
        ],
      },
    ],
  },

  "condiciones-del-servicio": {
    title: "Condiciones del servicio",
    subtitle: "Información sobre la contratación y prestación de nuestros servicios.",
    icon: FileText,
    intro:
      "Estas condiciones regulan la relación entre Educación en Salud y las personas u organizaciones que solicitan o contratan nuestros servicios.",
    sections: [
      {
        title: "1. Ámbito de aplicación",
        paragraphs: [
          "Las presentes condiciones se aplican a las solicitudes, reservas y contrataciones de servicios ofrecidos por Educación en Salud, incluyendo talleres, experiencias de bienestar, formación y propuestas para empresas.",
        ],
      },
      {
        title: "2. Información sobre los servicios",
        paragraphs: [
          "Los servicios, sus características, formatos y condiciones particulares se comunicarán antes de formalizar cada contratación.",
          "Las propuestas podrán adaptarse a las necesidades, objetivos, disponibilidad y características de cada organización.",
        ],
      },
      {
        title: "3. Solicitudes y contratación",
        paragraphs: [
          "Las solicitudes de información o reuniones iniciales no implican por sí mismas la contratación de un servicio.",
          "La contratación quedará formalizada cuando ambas partes hayan aceptado la propuesta y las condiciones particulares correspondientes.",
        ],
      },
      {
        title: "4. Precios y pagos",
        paragraphs: [
          "Los precios, impuestos aplicables, condiciones de pago y posibles gastos adicionales se comunicarán en la propuesta o presupuesto correspondiente antes de la contratación.",
        ],
      },
      {
        title: "5. Organización y prestación",
        paragraphs: [
          "La fecha, horario, duración, modalidad y ubicación de las actividades se acordarán con el cliente.",
          "Educación en Salud se compromete a prestar los servicios conforme a las características acordadas y a comunicar cualquier circunstancia que pueda afectar a su desarrollo.",
        ],
      },
      {
        title: "6. Modificaciones y cancelaciones",
        paragraphs: [
          "Las modificaciones de fechas, horarios, contenidos o formato deberán acordarse entre las partes.",
          "Las condiciones específicas de cancelación, aplazamiento y posibles devoluciones se establecerán en cada propuesta o contrato.",
        ],
      },
      {
        title: "7. Obligaciones del cliente",
        paragraphs: [
          "El cliente se compromete a facilitar la información necesaria para organizar las actividades, comunicar las condiciones relevantes del espacio y colaborar para que el servicio pueda desarrollarse correctamente.",
        ],
      },
      {
        title: "8. Responsabilidad",
        paragraphs: [
          "Cada servicio se prestará dentro de los límites de su naturaleza y de las condiciones acordadas. Las recomendaciones educativas o de bienestar no sustituyen la valoración, diagnóstico o tratamiento individual por parte de profesionales sanitarios cuando estos sean necesarios.",
        ],
      },
      {
        title: "9. Propiedad intelectual",
        paragraphs: [
          "Los materiales, documentos, recursos y contenidos desarrollados por Educación en Salud están protegidos por los derechos de propiedad intelectual que correspondan. Su reproducción o distribución requiere autorización, salvo los usos expresamente permitidos.",
        ],
      },
      {
        title: "10. Protección de datos",
        paragraphs: [
          "Los datos personales tratados durante la solicitud y prestación de los servicios se gestionarán conforme a nuestra Política de Privacidad.",
        ],
      },
      {
        title: "11. Legislación aplicable",
        paragraphs: [
          "Estas condiciones se regirán por la legislación española. Cuando el cliente tenga la condición de consumidor, se respetarán los derechos que le reconozca la normativa de protección de consumidores y usuarios.",
        ],
      },
      {
        title: "12. Contacto",
        paragraphs: [
          "Para cualquier duda sobre estas condiciones puedes escribirnos a info@educacionensalud.es.",
        ],
      },
    ],
  },
};

export function LegalPage({ type }) {
  const page = legalPages[type];

  if (!page) return null;

  const Icon = page.icon;

  return (
    <>
      <Header />

      <main className="legal-page">
        <section className="legal-hero">
          <div className="legal-hero-content">
            <span className="legal-eyebrow">
              EDUCACIÓN EN SALUD
            </span>

            <div className="legal-title-row">
              <div className="legal-title-icon">
                <Icon size={34} strokeWidth={1.6} />
              </div>

              <div>
                <h1>{page.title}</h1>
                <div className="legal-underline" />
              </div>
            </div>

            <p>{page.subtitle}</p>
          </div>
        </section>

        <div className="legal-container">
          <aside className="legal-sidebar">
            <span>DOCUMENTACIÓN</span>

            <a href="/aviso-legal">
              Aviso legal
            </a>

            <a href="/politica-de-privacidad">
              Política de privacidad
            </a>

            <a href="/condiciones-del-servicio">
              Condiciones del servicio
            </a>
          </aside>

          <article className="legal-content">
            <div className="legal-intro">
              {page.intro}
            </div>

            {page.sections.map((section, index) => (
              <section
                className="legal-section"
                key={index}
              >
                <h2>{section.title}</h2>

                {section.paragraphs?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}

                {section.list && (
                  <ul>
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="legal-contact-card">
              <div className="legal-contact-icon">
                <Mail size={25} />
              </div>

              <div>
                <h3>¿Tienes alguna duda?</h3>
                <p>
                  Estamos aquí para ayudarte. Escríbenos y
                  resolveremos cualquier consulta.
                </p>
                <a href="mailto:info@educacionensalud.es">
                  info@educacionensalud.es
                  <ChevronRight size={17} />
                </a>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

export function AvisoLegal() {
  return <LegalPage type="aviso-legal" />;
}

export function PoliticaPrivacidad() {
  return <LegalPage type="politica-de-privacidad" />;
}

export function CondicionesServicio() {
  return <LegalPage type="condiciones-del-servicio" />;
}
