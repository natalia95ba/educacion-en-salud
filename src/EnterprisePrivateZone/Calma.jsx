import { BlockPage } from "../components/PausaUI";
import { blocks } from "./pausaNavigation";

export function Calma() {
  return (
    <BlockPage area={blocks.calma} bodies={{
      respira: <><strong>Respiración consciente</strong><p>Descubre una práctica guiada, sencilla y adaptable a tu ritmo.</p></>,
      presente: <><strong>Atención plena</strong><p>Descubre cómo convertir algo tan cotidiano en un ejercicio de atención consciente.</p></>,
      tension: <><strong>Relajación muscular</strong><p>Explora la relajación muscular progresiva como técnica para reconocer y soltar la tensión.</p></>,
      cafe: <><strong>Cafeína y energía</strong><p>Conoce las dos caras del café y cómo utilizarlo sin que perjudique tu descanso.</p></>,
      descanso: <><strong>Sueño y recuperación</strong><p>Descubre cómo la luz, los horarios y las decisiones cotidianas influyen en tus ritmos biológicos.</p></>,
    }} />
  );
}
