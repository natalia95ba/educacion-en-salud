
<<<<<<< HEAD
import { lazy, Suspense, useId, useMemo, useRef, useState } from "react";
import { BlockHeader, Button, ResourceCard, SelectField } from "../components/PausaUI";
import { blocks } from "./pausaNavigation";
import {
  Dumbbell,
=======
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Layers,
  Footprints,
  Dumbbell,
  Apple,
  Bed,
  Brain,
  CalendarDays,
  Bell,
  UserRound,
>>>>>>> origin/main
  Calendar,
  ChartNoAxesColumnIncreasing,
  ChevronDown,
  ChevronRight,
<<<<<<< HEAD
=======
  Download,
>>>>>>> origin/main
  Bookmark,
  Sparkles,
  HeartPulse,
  Timer,
  CircleHelp,
<<<<<<< HEAD
  Check,
} from "lucide-react";
import "./css/TrainingBuilder.css";

const WorkoutGeneratorV3 = lazy(() => import("./WorkoutGeneratorV3"));

=======
  X,
  Check,
  Menu,
} from "lucide-react";
import "./css/TrainingBuilder.css";

>>>>>>> origin/main
const MOVEMENT_PATTERNS = [
  {
    id: "horizontal-push",
    name: "Empuje horizontal",
    icon: "↔",
    exercises: [
      "Press de pecho en máquina",
      "Flexiones",
      "Press de pecho con mancuernas",
    ],
  },
  {
    id: "vertical-push",
    name: "Empuje vertical",
    icon: "↥",
    exercises: [
      "Press de hombros con mancuernas",
      "Press militar en máquina",
      "Elevaciones laterales",
    ],
  },
  {
    id: "horizontal-pull",
    name: "Tracción horizontal",
    icon: "⇄",
    exercises: [
      "Remo en máquina",
      "Remo con mancuernas",
      "Remo sentado en polea",
    ],
  },
  {
    id: "vertical-pull",
    name: "Tracción vertical",
    icon: "⇅",
    exercises: [
      "Jalón al pecho",
      "Dominadas asistidas",
      "Jalón con agarre neutro",
    ],
  },
  {
    id: "knee",
    name: "Dominante de rodilla",
    icon: "⌁",
    exercises: [
      "Sentadilla goblet",
      "Prensa de piernas",
      "Sentadilla en multipower",
    ],
  },
  {
    id: "hip",
    name: "Dominante de cadera",
    icon: "⌁",
    exercises: [
      "Peso muerto rumano",
      "Hip thrust",
      "Buenos días",
    ],
  },
];

const INITIAL_SELECTIONS = {
  "horizontal-push": "Press de pecho en máquina",
  "vertical-push": "Press de hombros con mancuernas",
  "horizontal-pull": "Remo en máquina",
  "vertical-pull": "Jalón al pecho",
  knee: "Sentadilla goblet",
  hip: "Peso muerto rumano",
};

const CARDIO_OPTIONS = [
  "Bicicleta estática",
  "Cinta de correr",
  "Elíptica",
  "Remo",
  "Caminata rápida",
];

const FAQS = [
  {
    question: "¿Sirve con solo 2 días?",
    answer:
      "Sí. Dos sesiones semanales bien estructuradas pueden ayudarte a trabajar los principales patrones de movimiento y mejorar progresivamente tu condición física.",
  },
  {
    question: "¿Cómo elijo el peso?",
    answer:
      "Elige una carga que te permita completar las repeticiones manteniendo una técnica correcta. Las últimas repeticiones deben suponer un esfuerzo, pero sin perder el control.",
  },
  {
    question: "¿Puedo cambiar ejercicios?",
    answer:
      "Sí. Puedes modificar los ejercicios de cada patrón de movimiento utilizando los selectores de la rueda PAUSA.",
  },
  {
    question: "¿Cómo mejorar el cardio?",
    answer:
      "Empieza con intervalos adaptados a tu nivel. Puedes aumentar progresivamente el tiempo de trabajo o reducir los descansos según tu evolución.",
  },
];

<<<<<<< HEAD
=======
function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: "Inicio", icon: Home, to: "/dashboard" },
    { label: "Mi programa PAUSA", icon: Layers, to: "/programa" },
    { label: "Movimiento cotidiano", icon: Footprints, to: "/movimiento" },
    {
      label: "Fuerza y capacidad cardiovascular",
      icon: Dumbbell,
      to: "/fuerza",
      active: true,
    },
    { label: "Alimentación", icon: Apple, to: "/alimentacion" },
    { label: "Descanso", icon: Bed, to: "/descanso" },
    { label: "Bienestar emocional", icon: Brain, to: "/calma" },
    { label: "Hábitos y continuidad", icon: CalendarDays, to: "/habitos" },
  ];

  return (
    <>
      <button
        className="tb-mobile-menu"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Abrir menú"
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {mobileOpen && (
        <button
          className="tb-sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-label="Cerrar menú"
        />
      )}

      <aside className={`tb-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="tb-sidebar-brand">
          <div className="tb-education-logo">
            <div className="tb-education-symbol">S</div>
            <span>Educación</span>
            <small>en Salud</small>
          </div>
        </div>

        <div className="tb-sidebar-logo">
          <strong>PAUSA</strong>
          <span />
        </div>

        <nav className="tb-sidebar-nav">
          {links.map(({ label, icon: Icon, to, active }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMobileOpen(false)}
              className={`tb-nav-link ${active ? "active" : ""}`}
            >
              <Icon size={21} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="tb-sidebar-decoration">
          <div />
          <div />
        </div>
      </aside>
    </>
  );
}

function Header() {
  return (
    <header className="tb-header">
      <div className="tb-header-brand">
        <strong>PAUSA</strong>
        <span />
        <p>Tu programa de bienestar corporativo</p>
      </div>

      <div className="tb-header-actions">
        <button aria-label="Notificaciones">
          <Bell size={21} />
          <i />
        </button>
        <button aria-label="Mi perfil" className="tb-profile-button">
          <UserRound size={21} />
        </button>
      </div>
    </header>
  );
}

>>>>>>> origin/main
function Wheel({ selected, onSelect }) {
  const wheelColors = [
    "#087C68",
    "#0A9B85",
    "#62B995",
    "#087C68",
    "#0A9B85",
    "#62B995",
  ];

  const positions = [
    { top: "16%", left: "73%" },
    { top: "51%", left: "83%" },
    { top: "84%", left: "69%" },
    { top: "84%", left: "29%" },
    { top: "51%", left: "17%" },
    { top: "16%", left: "29%" },
  ];

  return (
    <div className="tb-wheel-wrap">
      <div className="tb-wheel">
        <div className="tb-wheel-ring">
          {MOVEMENT_PATTERNS.map((pattern, index) => {
            const angle = index * 60 - 30;
            const isSelected = selected === pattern.id;

            return (
              <button
                key={pattern.id}
                className={`tb-wheel-segment ${isSelected ? "selected" : ""}`}
                style={{
                  "--segment-color": wheelColors[index],
                  "--segment-angle": `${angle}deg`,
                  ...positions[index],
                }}
                onClick={() => onSelect(pattern.id)}
                aria-label={pattern.name}
                title={pattern.name}
              >
                <span className="tb-wheel-symbol">
                  {pattern.icon}
                </span>
                <span>{pattern.name}</span>
              </button>
            );
          })}
        </div>

        <div className="tb-wheel-center">
          <Dumbbell size={28} />
          <strong>Rueda</strong>
          <strong>PAUSA</strong>
        </div>
      </div>
    </div>
  );
}

function WorkoutCard({ title, exercises, cardio, selected, onClick }) {
  return (
    <button
      type="button"
      className={`tb-workout-choice ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="tb-workout-choice-title">
        <span>{title.slice(-1)}</span>
        <strong>{title}</strong>
        <ChevronRight size={22} />
      </div>

      <div className="tb-workout-choice-row">
        <Dumbbell size={22} />
        <span>Fuerza (3 ejercicios)</span>
      </div>

      <div className="tb-workout-choice-row">
        <HeartPulse size={22} />
        <span>Cardio por intervalos ({cardio})</span>
      </div>
    </button>
  );
}

function WorkoutSummary({ title, exercises, cardio, cardioTime }) {
  return (
    <div className="tb-summary-workout">
      <div className="tb-summary-workout-heading">
        <Calendar size={17} />
        <strong>{title}</strong>
        <small>≈ 40–45 min</small>
      </div>

      <div className="tb-summary-list">
        {exercises.map((exercise, index) => (
          <div className="tb-summary-row" key={`${exercise}-${index}`}>
            <Dumbbell size={16} />
            <span>{exercise}</span>
            <strong>3 × 8–12</strong>
          </div>
        ))}

        <div className="tb-summary-row tb-summary-cardio">
          <HeartPulse size={18} />
          <span>
            Cardio por intervalos
            <small>({cardio})</small>
          </span>
          <strong>{cardioTime}</strong>
        </div>
      </div>
    </div>
  );
}

export default function TrainingBuilder() {
<<<<<<< HEAD
  return (
    <div className="platform-content">
      <BlockHeader area={{ ...blocks.fuerza, subtitle: "Entrenamiento eficiente, flexible y adaptado a tu ritmo." }} />
      <WorkoutGenerator />
    </div>
  );
}

export function WorkoutGenerator({ embedded = false }) {
  if (embedded) {
    return (
      <Suspense fallback={<p>Cargando la biblioteca de entrenamientos…</p>}>
        <WorkoutGeneratorV3 />
      </Suspense>
    );
  }

  return <LegacyWorkoutGenerator embedded={embedded} />;
}

function LegacyWorkoutGenerator({ embedded }) {
  const faqId = useId();
  const resultHeading = useRef(null);
=======
>>>>>>> origin/main
  const [days, setDays] = useState("2 días por semana");
  const [level, setLevel] = useState("Inicial");
  const [equipment, setEquipment] = useState(
    "Gimnasio (máquinas y mancuernas)"
  );
  const [selectedWorkout, setSelectedWorkout] = useState("A");
  const [activePattern, setActivePattern] = useState("horizontal-push");
  const [selections, setSelections] = useState(INITIAL_SELECTIONS);
  const [cardio, setCardio] = useState("Bicicleta estática");
  const [activeFaq, setActiveFaq] = useState(null);
  const [generated, setGenerated] = useState(false);
  const [saved, setSaved] = useState(false);

  const pattern = MOVEMENT_PATTERNS.find(
    (item) => item.id === activePattern
  );

  const selectedExercises = useMemo(
    () => Object.values(selections),
    [selections]
  );

  const workoutA = [
    selections["horizontal-push"],
    selections["knee"],
    selections["horizontal-pull"],
  ];

  const workoutB = [
    selections["vertical-push"],
    selections["hip"],
    selections["vertical-pull"],
  ];

  const changeExercise = (patternId, exercise) => {
    setSelections((current) => ({
      ...current,
      [patternId]: exercise,
    }));
    setGenerated(false);
  };

  const generateRecipe = () => {
    setGenerated(true);
    setSelectedWorkout("A");
<<<<<<< HEAD
    if (embedded) resultHeading.current?.focus();
=======
>>>>>>> origin/main
  };

  const saveRecipe = () => {
    const recipe = {
      days,
      level,
      equipment,
      cardio,
      selections,
      workoutA,
      workoutB,
      createdAt: new Date().toISOString(),
    };

    const previous = JSON.parse(
      localStorage.getItem("pausa-training-recipes") || "[]"
    );

    localStorage.setItem(
      "pausa-training-recipes",
      JSON.stringify([...previous, recipe])
    );

    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  const downloadRecipe = () => {
    window.print();
  };

  return (
<<<<<<< HEAD
    <div className={embedded ? "tb-page tb-generator--embedded" : "tb-page"}>
      <div className="tb-columns">
        <div className="tb-left-column">
          <section className="tb-panel">
            <div className="tb-section-heading">
              <span className="tb-number">1</span>
              <div>
                <h2>Personaliza tu entrenamiento</h2>
                <p>
                  Cuéntanos tu situación para adaptar la Receta PAUSA a ti.
                </p>
              </div>
            </div>

            <div className="tb-preferences">
              <label className="tb-preference">
                <Calendar size={24} />
                <div>
                  <strong>¿Cuántos días puedes entrenar?</strong>
                  <SelectField
                    value={days}
                    onChange={(event) => setDays(event.target.value)}
                  >
                    <option>1 día por semana</option>
                    <option>2 días por semana</option>
                    <option>3 días por semana</option>
                    <option>4 días por semana</option>
                    <option>5 días por semana</option>
                  </SelectField>
                </div>
              </label>

              <label className="tb-preference">
                <ChartNoAxesColumnIncreasing size={25} />
                <div>
                  <strong>Nivel de experiencia</strong>
                  <SelectField
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                  >
                    <option>Inicial</option>
                    <option>Intermedio</option>
                    <option>Avanzado</option>
                  </SelectField>
                </div>
              </label>

              <label className="tb-preference">
                <Dumbbell size={25} />
                <div>
                  <strong>Material disponible</strong>
                  <SelectField
                    value={equipment}
                    onChange={(event) =>
                      setEquipment(event.target.value)
                    }
                  >
                    <option>Gimnasio (máquinas y mancuernas)</option>
                    <option>Solo mancuernas</option>
                    <option>Bandas elásticas</option>
                    <option>Peso corporal</option>
                    <option>Gimnasio completo</option>
                  </SelectField>
                </div>
              </label>
            </div>
          </section>

          <section className="tb-recipe-section">
            <div className="tb-recipe-heading">
              <div className="tb-section-heading">
                <span className="tb-number">2</span>
                <div>
                  <h2>Tu Receta PAUSA</h2>
                  <p>
                    Una propuesta base que puedes personalizar según tus
                    preferencias.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="tb-generate-button"
                onClick={generateRecipe}
              >
                <Sparkles size={19} />
                {generated ? "Actualizar mi receta" : "Generar mi receta PAUSA"}
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="tb-workout-options">
              <WorkoutCard
                title="Entrenamiento A"
                exercises={workoutA}
                cardio={cardio}
                selected={selectedWorkout === "A"}
                onClick={() => setSelectedWorkout("A")}
              />

              <WorkoutCard
                title="Entrenamiento B"
                exercises={workoutB}
                cardio={cardio}
                selected={selectedWorkout === "B"}
                onClick={() => setSelectedWorkout("B")}
              />
            </div>
          </section>

          <section className="tb-wheel-section">
            <div className="tb-wheel-heading">
              <h2>Rueda PAUSA de la Fuerza</h2>
              <p>
                Elige o cambia los ejercicios de cada patrón de movimiento.
              </p>
            </div>

            <div className="tb-wheel-content">
              <Wheel
                selected={activePattern}
                onSelect={setActivePattern}
              />

              <div className="tb-pattern-list">
                {MOVEMENT_PATTERNS.map((item) => (
                  <div
                    key={item.id}
                    className={`tb-pattern-row ${
                      activePattern === item.id ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="tb-pattern-name"
                      onClick={() => setActivePattern(item.id)}
                    >
                      <span>{item.icon}</span>
                      <strong>{item.name}</strong>
                    </button>

                    <SelectField
                      value={selections[item.id]}
                      onChange={(event) =>
                        changeExercise(item.id, event.target.value)
                      }
                      aria-label={`Ejercicio: ${item.name}`}
                    >
                      {item.exercises.map((exercise) => (
                        <option key={exercise}>{exercise}</option>
                      ))}
                    </SelectField>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="tb-cardio-section">
            <div className="tb-cardio-icon">
              <HeartPulse size={30} />
            </div>

            <div className="tb-cardio-copy">
              <strong>Capacidad cardiovascular</strong>
              <span>
                Trabajo por intervalos, eficiente y adaptable.
              </span>
            </div>

            <SelectField
              aria-label="Modalidad cardiovascular"
              value={cardio}
              onChange={(event) => setCardio(event.target.value)}
            >
              {CARDIO_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </SelectField>

            <div className="tb-cardio-example">
              <Timer size={22} />
              <span>
                Ejemplo: 5 × 2 min intensos + 2 min suaves
                <small>≈ 12–15 min</small>
              </span>
            </div>
          </section>
        </div>

        <aside className="tb-right-column">
          <section className="tb-summary-section">
            <div className="tb-section-heading">
              <span className="tb-number">3</span>
              <div>
                <h2 ref={resultHeading} tabIndex={embedded ? -1 : undefined}>Tu entrenamiento personalizado</h2>
                <p>Según tus selecciones, esta es tu Receta PAUSA.</p>
              </div>
            </div>

            <WorkoutSummary
              title="Entrenamiento A"
              exercises={workoutA}
              cardio={cardio}
              cardioTime="10–15 min"
            />

            <WorkoutSummary
              title="Entrenamiento B"
              exercises={workoutB}
              cardio={cardio}
              cardioTime="10–15 min"
            />

            <div className="tb-summary-actions">
              <ResourceCard title="Descargar receta (PDF)" onDownload={downloadRecipe} />

              <Button onClick={saveRecipe}>
                {saved ? <Check size={19} /> : <Bookmark size={19} />}
                {saved ? "Guardado" : "Guardar en mis recursos"}
              </Button>
            </div>
          </section>

          <section className="tb-faq-section">
            <div className="tb-faq-heading">
              <CircleHelp size={40} />
              <div>
                <h2>PAUSA Responde</h2>
                <p>Resuelve tus dudas más frecuentes.</p>
              </div>
            </div>

            <div className="tb-faq-list">
              {FAQS.map((faq, index) => (
                <div
                  className={`tb-faq-item ${
                    activeFaq === index ? "open" : ""
                  }`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    aria-expanded={activeFaq === index}
                    aria-controls={`${faqId}-${index}`}
                    onClick={() =>
                      setActiveFaq(
                        activeFaq === index ? null : index
                      )
                    }
                  >
                    <span>{faq.question}</span>
                    <ChevronDown size={17} />
                  </button>

                  <p id={`${faqId}-${index}`} hidden={activeFaq !== index}>{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="tb-personal-note">
            <Sparkles size={19} />
            <p>
              Tu entrenamiento debe adaptarse a ti. Escucha tu cuerpo y
              avanza a tu propio ritmo.
            </p>
          </div>
        </aside>
      </div>
=======
    <div className="tb-app">
      <Sidebar />

      <main className="tb-main">
        <Header />

        <div className="tb-page">
          <section className="tb-hero">
            <div className="tb-hero-icon">
              <Dumbbell size={38} />
            </div>

            <div className="tb-hero-copy">
              <h1>Fuerza y capacidad cardiovascular</h1>
              <p>
                Entrenamiento eficiente, flexible y adaptado a tu ritmo.
              </p>
            </div>

            <div className="tb-hero-image" />
          </section>

          <div className="tb-columns">
            <div className="tb-left-column">
              <section className="tb-panel">
                <div className="tb-section-heading">
                  <span className="tb-number">1</span>
                  <div>
                    <h2>Personaliza tu entrenamiento</h2>
                    <p>
                      Cuéntanos tu situación para adaptar la Receta PAUSA a ti.
                    </p>
                  </div>
                </div>

                <div className="tb-preferences">
                  <label className="tb-preference">
                    <Calendar size={24} />
                    <div>
                      <strong>¿Cuántos días puedes entrenar?</strong>
                      <select
                        value={days}
                        onChange={(event) => setDays(event.target.value)}
                      >
                        <option>1 día por semana</option>
                        <option>2 días por semana</option>
                        <option>3 días por semana</option>
                        <option>4 días por semana</option>
                        <option>5 días por semana</option>
                      </select>
                    </div>
                  </label>

                  <label className="tb-preference">
                    <ChartNoAxesColumnIncreasing size={25} />
                    <div>
                      <strong>Nivel de experiencia</strong>
                      <select
                        value={level}
                        onChange={(event) => setLevel(event.target.value)}
                      >
                        <option>Inicial</option>
                        <option>Intermedio</option>
                        <option>Avanzado</option>
                      </select>
                    </div>
                  </label>

                  <label className="tb-preference">
                    <Dumbbell size={25} />
                    <div>
                      <strong>Material disponible</strong>
                      <select
                        value={equipment}
                        onChange={(event) =>
                          setEquipment(event.target.value)
                        }
                      >
                        <option>Gimnasio (máquinas y mancuernas)</option>
                        <option>Solo mancuernas</option>
                        <option>Bandas elásticas</option>
                        <option>Peso corporal</option>
                        <option>Gimnasio completo</option>
                      </select>
                    </div>
                  </label>
                </div>
              </section>

              <section className="tb-recipe-section">
                <div className="tb-recipe-heading">
                  <div className="tb-section-heading">
                    <span className="tb-number">2</span>
                    <div>
                      <h2>Tu Receta PAUSA</h2>
                      <p>
                        Una propuesta base que puedes personalizar según tus
                        preferencias.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="tb-generate-button"
                    onClick={generateRecipe}
                  >
                    <Sparkles size={19} />
                    {generated ? "Actualizar mi receta" : "Generar mi receta PAUSA"}
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="tb-workout-options">
                  <WorkoutCard
                    title="Entrenamiento A"
                    exercises={workoutA}
                    cardio={cardio}
                    selected={selectedWorkout === "A"}
                    onClick={() => setSelectedWorkout("A")}
                  />

                  <WorkoutCard
                    title="Entrenamiento B"
                    exercises={workoutB}
                    cardio={cardio}
                    selected={selectedWorkout === "B"}
                    onClick={() => setSelectedWorkout("B")}
                  />
                </div>
              </section>

              <section className="tb-wheel-section">
                <div className="tb-wheel-heading">
                  <h2>Rueda PAUSA de la Fuerza</h2>
                  <p>
                    Elige o cambia los ejercicios de cada patrón de movimiento.
                  </p>
                </div>

                <div className="tb-wheel-content">
                  <Wheel
                    selected={activePattern}
                    onSelect={setActivePattern}
                  />

                  <div className="tb-pattern-list">
                    {MOVEMENT_PATTERNS.map((item) => (
                      <div
                        key={item.id}
                        className={`tb-pattern-row ${
                          activePattern === item.id ? "active" : ""
                        }`}
                      >
                        <button
                          type="button"
                          className="tb-pattern-name"
                          onClick={() => setActivePattern(item.id)}
                        >
                          <span>{item.icon}</span>
                          <strong>{item.name}</strong>
                        </button>

                        <select
                          value={selections[item.id]}
                          onChange={(event) =>
                            changeExercise(item.id, event.target.value)
                          }
                          aria-label={`Ejercicio: ${item.name}`}
                        >
                          {item.exercises.map((exercise) => (
                            <option key={exercise}>{exercise}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="tb-cardio-section">
                <div className="tb-cardio-icon">
                  <HeartPulse size={30} />
                </div>

                <div className="tb-cardio-copy">
                  <strong>Capacidad cardiovascular</strong>
                  <span>
                    Trabajo por intervalos, eficiente y adaptable.
                  </span>
                </div>

                <select
                  value={cardio}
                  onChange={(event) => setCardio(event.target.value)}
                >
                  {CARDIO_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>

                <div className="tb-cardio-example">
                  <Timer size={22} />
                  <span>
                    Ejemplo: 5 × 2 min intensos + 2 min suaves
                    <small>≈ 12–15 min</small>
                  </span>
                </div>
              </section>
            </div>

            <aside className="tb-right-column">
              <section className="tb-summary-section">
                <div className="tb-section-heading">
                  <span className="tb-number">3</span>
                  <div>
                    <h2>Tu entrenamiento personalizado</h2>
                    <p>Según tus selecciones, esta es tu Receta PAUSA.</p>
                  </div>
                </div>

                <WorkoutSummary
                  title="Entrenamiento A"
                  exercises={workoutA}
                  cardio={cardio}
                  cardioTime="10–15 min"
                />

                <WorkoutSummary
                  title="Entrenamiento B"
                  exercises={workoutB}
                  cardio={cardio}
                  cardioTime="10–15 min"
                />

                <div className="tb-summary-actions">
                  <button onClick={downloadRecipe}>
                    <Download size={19} />
                    Descargar receta (PDF)
                  </button>

                  <button onClick={saveRecipe}>
                    {saved ? <Check size={19} /> : <Bookmark size={19} />}
                    {saved ? "Guardado" : "Guardar en mis recursos"}
                  </button>
                </div>
              </section>

              <section className="tb-faq-section">
                <div className="tb-faq-heading">
                  <CircleHelp size={40} />
                  <div>
                    <h2>PAUSA Responde</h2>
                    <p>Resuelve tus dudas más frecuentes.</p>
                  </div>
                </div>

                <div className="tb-faq-list">
                  {FAQS.map((faq, index) => (
                    <div
                      className={`tb-faq-item ${
                        activeFaq === index ? "open" : ""
                      }`}
                      key={faq.question}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveFaq(
                            activeFaq === index ? null : index
                          )
                        }
                      >
                        <span>{faq.question}</span>
                        <ChevronDown size={17} />
                      </button>

                      {activeFaq === index && (
                        <p>{faq.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <div className="tb-personal-note">
                <Sparkles size={19} />
                <p>
                  Tu entrenamiento debe adaptarse a ti. Escucha tu cuerpo y
                  avanza a tu propio ritmo.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>
>>>>>>> origin/main
    </div>
  );
}
