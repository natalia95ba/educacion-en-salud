import { BlockPage } from "../components/PausaUI";
import { deka } from "./pausaNavigation";

export default function Deka() {
  return (
    <BlockPage area={deka} label="Experiencia complementaria" bodies={{
      descubre: <p>La colaboración con DEKA ofrece una experiencia opcional para entrenar con un propósito, afrontar un desafío personal y compartir la motivación con otras personas.</p>,
      desafio: <p>Al valorar las modalidades DEKA, ten en cuenta el formato, la exigencia física y si quieres participar por tu cuenta o con compañeros. Elige en función de tus objetivos, experiencia y disponibilidad.</p>,
      preparacion: <p>Este apartado está reservado para futuras herramientas y recursos de preparación.</p>,
      comparte: <p>El reto puede servir como punto de encuentro entre compañeros. Cada empresa puede explorar cómo acompañar la participación voluntaria o facilitar una actividad de equipo.</p>,
      "proximos-pasos": <p>Este espacio se actualizará cuando esté disponible la información sobre participación, eventos y contacto.</p>,
    }} />
  );
}
