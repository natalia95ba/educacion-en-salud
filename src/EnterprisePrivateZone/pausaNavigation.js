import {
  Apple, Bed, CalendarCheck, Coffee, CookingPot, Dumbbell, Flag, Footprints,
  Home, Leaf, Rocket, Settings, ShieldCheck, ShoppingBasket, SlidersHorizontal,
  TrendingUp, Trophy, Utensils, Wind, Layers, Compass, Users, MapPin,
  Activity, UserRound, PersonStanding,
} from "lucide-react";

export const home = { title: "Inicio", path: "/dashboard", icon: Home };

export const blocks = {
  movimiento: {
    number: "01", title: "Movimiento cotidiano", path: "/movimiento", icon: Footprints,
    subtitle: "Muévete más, incluso en los días más ocupados.",
    image: "movimiento.jpeg",
    modules: [
      ["espalda", "Espalda", "Movilidad y bienestar para tu espalda.", "movimiento-espalda.jpg", Activity],
      ["cuello", "Cuello", "Movilidad y alivio de la tensión.", "movimiento-cuello.jpg", UserRound],
      ["piernas-pesadas", "Piernas pesadas", "Activa y alivia la sensación de pesadez.", "movimiento-piernas.jpg", Footprints],
      ["movimiento-integrado", "Movimiento integrado", "Oportunidades para moverte en tu día a día.", "movimiento-integrado.jpg", PersonStanding],
    ],
  },
  fuerza: {
    number: "02", title: "Fuerza y capacidad cardiovascular", path: "/fuerza", icon: Dumbbell,
    subtitle: "Entrena de forma inteligente, incluso cuando tienes poco tiempo.",
    image: "fuerza-portada.jpg",
    childPath: "/entrenamiento-personalizado",
    modules: [
      ["plan-b", "Tu plan B para seguir entrenando", "La Receta PAUSA: el entrenamiento esencial que siempre funciona.", "fuerza-portada.jpg", ShieldCheck],
      ["entrenamiento", "Tu entrenamiento, a tu medida", "Genera tu plan según tus días disponibles, nivel y lugar de entrenamiento.", "movimiento.jpeg", SlidersHorizontal],
      ["progresion", "Progresa sin complicarte", "Aprende a mejorar, adaptar y mantener tu entrenamiento de forma segura y sostenible.", "fuerza-progreso.jpg", TrendingUp],
    ],
  },
  alimentacion: {
    number: "03", title: "Alimentación", path: "/alimentacion", icon: Apple,
    subtitle: "Come mejor, organiza tus comidas y disfruta cuidándote.",
    image: "alimentacion-portada.jpg",
    modules: [
      ["organiza", "Organiza tus comidas", "Aprende a planificar tus comidas y a construir platos equilibrados sin complicaciones.", "alimentacion-plan.jpg", Utensils],
      ["recetas", "Recetas fáciles y saludables", "Ideas prácticas, sabrosas y sencillas para incorporar a tu alimentación diaria.", "alimentacion-recetas.jpg", CookingPot],
      ["compra", "Tu compra, más sencilla", "Organiza la lista de la compra y aprende a elegir alimentos de forma práctica.", "alimentacion-compra.jpg", ShoppingBasket],
      ["batch-cooking", "Batch cooking", "Organización y preparación anticipada de comidas.", "alimentacion-batch.jpg", Layers],
      ["estrategias", "Estrategias para tu alimentación", "Herramientas prácticas para facilitar las decisiones alimentarias.", "alimentacion-estrategias.jpg", Leaf],
    ],
  },
  calma: {
    number: "04", title: "Calma", path: "/calma", icon: Bed,
    subtitle: "Baja las revoluciones. Recupera tu equilibrio.",
    image: "calma-portada.jpg",
    modules: [
      ["respira", "Respira y baja las revoluciones", "Tu respiración puede ayudarte a encontrar un momento de calma.", "calma-respira.jpg", Wind],
      ["presente", "Vuelve al presente", "A veces no necesitas hacer más, sino prestar atención a lo que ya haces.", "calma-presente.jpg", Leaf],
      ["tension", "Suelta la tensión", "Aprende a reconocer cuándo tus músculos están tensos y a relajarlos voluntariamente.", "calma-tension.jpg", Dumbbell],
      ["cafe", "¿Café o descanso? Tú decides", "El café puede ser un aliado, pero también puede estar ocultando tu cansancio.", "calma-cafe.jpg", Coffee],
      ["descanso", "Tu descanso empieza al despertar", "Dormir mejor no depende únicamente de lo que haces antes de acostarte.", "calma-sueno.jpg", Bed],
    ],
  },
  habitos: {
    number: "05", title: "Hábitos y continuidad", path: "/habitos", icon: CalendarCheck,
    subtitle: "Pequeños pasos. Grandes cambios que perduran.",
    image: "habitos-portada.jpg",
    modules: [
      ["motivacion", "¿Para qué quieres sentirte bien?", "Reflexiona sobre tus motivos, lo que te importa y define tu «Roma» personal.", "habitos-motivos.jpg", Flag],
      ["estrategias", "Estrategias para mantener tus hábitos", "Herramientas sencillas y eficaces para construir, sostener y retomar tus hábitos en el día a día.", "habitos-estrategias.jpg", Settings],
      ["cierre", "Y por último...", "Una breve reflexión final, ideas clave y próximos pasos para seguir cuidándote.", "habitos-cierre.jpg", Rocket],
    ],
  },
};

export const deka = {
  title: "Reto PAUSA × DEKA", path: "/deka", icon: Trophy,
  subtitle: "Entrena con un propósito. Desafíate y comparte la experiencia con tus compañeros.",
  image: "spartan-deka.jpg",
  modules: [
    ["descubre", "Descubre el Reto PAUSA × DEKA", "Presentación de la experiencia y sus objetivos.", "spartan-deka.jpg", Trophy],
    ["desafio", "Encuentra tu desafío", "Introducción a las modalidades DEKA y orientación para elegir.", "fuerza-portada.jpg", Compass],
    ["preparacion", "Prepárate para el reto", "Espacio para futuras herramientas y recursos de preparación.", "fuerza-progreso.jpg", Dumbbell],
    ["comparte", "Comparte la experiencia", "Posibilidades de participación con compañeros y empresas.", "talleres-bienestar.jpeg", Users],
    ["proximos-pasos", "Próximos pasos", "Aquí se reunirá la información sobre participación, eventos y contacto.", "habitos-portada.jpg", MapPin],
  ],
};

export const areas = Object.values(blocks);
export const imageUrl = (file) => `${import.meta.env.BASE_URL}images/${file}`;
