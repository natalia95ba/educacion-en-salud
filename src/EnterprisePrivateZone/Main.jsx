import React, { useMemo, useState } from 'react';
import {
  Bell, UserCircle, Home, Layers, Download, Star, Dumbbell, Play,
  CircleHelp, RefreshCw, CalendarDays, FileText, ChevronRight,
  Volume2, Maximize, Check, Menu, X, Pause, Activity, Apple,
  Bed, Flower2, Footprints, HeartPulse, Bookmark, Sparkles, ChevronDown,
  BarChart3, Bike, PersonStanding, Heart, Timer, Waves,
  Dumbbell as Weight, RotateCcw, DownloadCloud
} from 'lucide-react';
import banner from './assets/banner.jpg';
import videoThumb from './assets/video-thumb.jpg';
import YouTubePlayer from '../../src/components/YoutubePlayer';
import './styles.css'

const lessons = [
  { title: 'Entrena aunque tengas poco tiempo', icon: Play },
  { title: 'Construye tu entrenamiento', icon: Dumbbell },
  { title: 'Adapta y continúa', icon: RefreshCw },
];
const lessonContent = [
  { heading: '1. Entrena aunque tengas poco tiempo', duration: '3:48', learn: ['Por qué es importante entrenar fuerza y capacidad cardiovascular.','La Receta PAUSA: dos sesiones A y B.','Cómo organizarla en tu semana (2 o 3 días).','Cómo combinarla con otros deportes.'] },
  { heading: '2. Construye tu entrenamiento', duration: '5:12', learn: ['Cómo estructurar una sesión de entrenamiento.','Ejercicios básicos para trabajar todo el cuerpo.','Cómo elegir la intensidad adecuada.','Claves para entrenar con seguridad.'] },
  { heading: '3. Adapta y continúa', duration: '4:26', learn: ['Cómo adaptar los ejercicios a tu nivel.','Qué hacer cuando tienes menos tiempo.','Cómo progresar de forma gradual.','La importancia de mantener la constancia.'] },
];

function BrandMark() {
  return <div className="brand-mark"><span className="brand-symbol"><i /></span><span>Educaci<span className="brand-o">ó</span>n<br/><em>enSalud</em></span></div>;
}

function Sidebar({ activeNav, setActiveNav, open, onClose }) {
  const nav = [
    { label: 'Inicio', icon: Home },
    { label: 'Mi programa PAUSA', icon: Layers },
    { label: 'Movimiento cotidiano', icon: Footprints },
    { label: 'Fuerza y capacidad cardiovascular', icon: Dumbbell },
    { label: 'Alimentación', icon: Apple },
    { label: 'Calma', icon: Bed },
    { label: 'Hábitos y continuidad', icon: RefreshCw },
  ];
  return <>
    {open && <button className="mobile-scrim" onClick={onClose} aria-label="Cerrar menú" />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="sidebar-brand"><BrandMark /></div>
      <div className="sidebar-pausa">PAUSA<span /></div>
      <nav className="main-nav">
        {nav.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeNav === label ? 'selected' : ''}`} onClick={() => { setActiveNav(label); onClose(); }}><Icon size={29} strokeWidth={1.8}/><span>{label}</span></button>)}
      </nav>
      <div className="sidebar-wave"><span/><span/></div>
    </aside>
  </>;
}

function Header({ onMenu }) {
  return <header className="topbar">
    <button className="mobile-menu" onClick={onMenu} aria-label="Abrir menú"><Menu /></button>
    <div className="pausa-wordmark">PAUSA<span className="wordmark-wave" /></div>
    <div className="topbar-divider" />
    <div className="topbar-subtitle">Tu programa de bienestar corporativo</div>
    <div className="topbar-actions"><button aria-label="Notificaciones" className="icon-button notification"><Bell/><i/></button><button aria-label="Perfil" className="profile-button"><UserCircle /></button></div>
  </header>;
}

function Hero({ compact = false }) {
  return <section className={`hero ${compact ? 'hero-compact' : ''}`} style={{ backgroundImage: `linear-gradient(90deg, rgba(0,67,76,.98) 0%, rgba(0,67,76,.93) 53%, rgba(0,67,76,.04) 76%), url(${banner})` }}>
    <div className="hero-copy">{!compact && <div className="block-label">BLOQUE 2</div>}<div className="hero-title-row"><div className="hero-icon"><Dumbbell size={43}/></div><h1>Fuerza y capacidad cardiovascular</h1></div><p>Entrenamiento eficiente, flexible y adaptado a tu ritmo.</p></div>
    <div className="hero-curve" />
  </section>;
}

function LessonNav({ activeLesson, setActiveLesson }) {
  return <div className="lesson-nav">
    {lessons.map(({ title, icon: Icon }, i) => <button key={title} className={`lesson-link ${activeLesson === i ? 'active' : ''}`} onClick={() => setActiveLesson(i)}><span className="lesson-icon"><Icon size={29} strokeWidth={2.3}/></span><span>{i + 1}. {title}</span></button>)}
    <button className="faq-link" onClick={() => setActiveLesson(0)}><CircleHelp size={42}/><span><strong>PAUSA Responde</strong><br/>Preguntas frecuentes</span></button>
  </div>;
}

function VideoPlayer({ duration }) {
  const [playing, setPlaying] = useState(false), [muted, setMuted] = useState(false), [expanded, setExpanded] = useState(false);
  return <div className={`video-player ${expanded ? 'video-expanded' : ''}`}>
    <img src={videoThumb} alt="Persona realizando un ejercicio de fuerza con una pesa rusa" />
    <button className="big-play" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pausar vídeo' : 'Reproducir vídeo'}>{playing ? <Pause fill="white" size={31}/> : <Play fill="white" size={34}/>}</button>
    <div className="video-controls"><div className="progress-track"><span style={{width: playing ? '22%' : '13%'}}/></div><div className="control-row"><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pausar' : 'Reproducir'}>{playing ? <Pause size={21} fill="white"/> : <Play size={21} fill="white"/>}</button><span>{playing ? '0:48' : '0:00'} / {duration}</span><div className="control-spacer"/><button onClick={() => setMuted(!muted)} aria-label="Activar o desactivar sonido"><Volume2 size={24} className={muted ? 'muted' : ''}/></button><button onClick={() => setExpanded(!expanded)} aria-label="Ampliar vídeo"><Maximize size={23}/></button></div></div>
  </div>;
}
function LearningCard({ items }) { return <aside className="learning-card"><h2>En esta sesión aprenderás:</h2><ul>{items.map((item) => <li key={item}><span className="check"><Check size={17} strokeWidth={3}/></span><span>{item}</span></li>)}</ul></aside>; }
function Resources() {
  const [selected, setSelected] = useState('');
  const cards = [{ title: <>La Receta PAUSA<br/>(A/B)</>, icon: CalendarDays, name: 'La Receta PAUSA (A/B)' },{ title: <>Ejemplo de<br/>semana</>, icon: CalendarDays, name: 'Ejemplo de semana' },{ title: <>Guía resumida<br/>del bloque</>, icon: FileText, name: 'Guía resumida del bloque' }];
  return <><div className="resources">{cards.map(({ title, icon: Icon, name }) => <button className={`resource-card ${selected === name ? 'resource-selected' : ''}`} key={name} onClick={() => setSelected(selected === name ? '' : name)}><Icon className="resource-icon" size={55} strokeWidth={2.1}/><strong>{title}</strong><span className="resource-arrow"><ChevronRight size={22}/></span></button>)}</div>{selected && <div className="resource-detail"><strong>{selected}</strong><span>Recurso seleccionado. Aquí puedes integrar el PDF o el contenido descargable correspondiente.</span><button onClick={() => setSelected('')} aria-label="Cerrar recurso"><X size={18}/></button></div>}</>;
}

const movementOptions = [
  { key: 'Empuje horizontal', icon: Bed, choices: ['Press de pecho en máquina','Flexiones inclinadas','Press de pecho con mancuernas'] },
  { key: 'Empuje vertical', icon: PersonStanding, choices: ['Press de hombros con mancuernas','Press militar en máquina','Elevaciones frontales'] },
  { key: 'Tracción horizontal', icon: Bed, choices: ['Remo en máquina','Remo con mancuerna','Remo sentado en polea'] },
  { key: 'Tracción vertical', icon: PersonStanding, choices: ['Jalón al pecho','Jalón con agarre neutro','Dominadas asistidas'] },
  { key: 'Dominante de rodilla', icon: Footprints, choices: ['Sentadilla goblet','Prensa de piernas','Sentadilla a banco'] },
  { key: 'Dominante de cadera', icon: Waves, choices: ['Peso muerto rumano','Puente de glúteos','Pull through en polea'] },
];
const initialExercises = movementOptions.map(x => x.choices[0]);

function NumberStep({ number, children }) { return <div className="number-step"><span>{number}</span><div>{children}</div></div>; }
function SelectField({ label, icon: Icon, value, onChange, options }) {
  return <label className="select-field"><span className="field-label"><Icon size={26}/><b>{label}</b></span><span className="select-wrap"><select value={value} onChange={e => onChange(e.target.value)}>{options.map(o => <option key={o}>{o}</option>)}</select><ChevronDown size={17}/></span></label>;
}
function WorkoutCard({ letter, duration, exercises, cardio, onClick }) {
  return <button className="workout-card" onClick={onClick}><span className="workout-letter">{letter}</span><div className="workout-card-copy"><strong>Entrenamiento {letter}</strong><span><Dumbbell size={25}/> Fuerza (3 ejercicios)</span><span><HeartPulse size={27}/> Cardio por intervalos<br/>(10–15 min)</span></div><ChevronRight className="workout-chevron" size={27}/></button>;
}
function RecipeWheel() {
  const labels = ['Tracción\nvertical','Empuje\nhorizontal','Empuje\nvertical','Tracción\nhorizontal','Dominante\nde cadera','Dominante\nde rodilla'];
  return <div className="recipe-wheel"><div className="wheel-labels">{labels.map((l,i)=><span key={i} className={`wheel-label wheel-label-${i}`}>{l.split('\n').map(x=><React.Fragment key={x}>{x}<br/></React.Fragment>)}</span>)}</div><div className="wheel-center"><Dumbbell size={43}/><b>Rueda<br/>PAUSA</b></div></div>;
}
function TrainingBuilder() {
  const [days,setDays] = useState('2 días por semana');
  const [level,setLevel] = useState('Inicial');
  const [equipment,setEquipment] = useState('Gimnasio (máquinas y mancuernas)');
  const [exercises,setExercises] = useState(initialExercises);
  const [cardio,setCardio] = useState('Bicicleta estática');
  const [activeWorkout,setActiveWorkout] = useState('A');
  const [generated,setGenerated] = useState(false);
  const [saved,setSaved] = useState(false);
  const [faq,setFaq] = useState('');
  const [downloaded,setDownloaded] = useState(false);
  const updateExercise = (i,value) => setExercises(prev => prev.map((v,index)=>index===i?value:v));
  const exerciseSets = useMemo(()=> activeWorkout==='A' ? [exercises[0],exercises[4],exercises[2]] : [exercises[1],exercises[5],exercises[3]], [activeWorkout,exercises]);
  const questions = ['¿Sirve con solo 2 días?','¿Cómo elijo el peso?','¿Puedo cambiar ejercicios?','¿Cómo mejorar el cardio?'];
  return <div className="builder-layout">
    <div className="builder-main">
      <section className="builder-panel personal-panel">
        <NumberStep number="1"><h2>Personaliza tu entrenamiento</h2><p>Cuéntanos tu situación para adaptar la Receta PAUSA a ti.</p></NumberStep>
        <div className="personal-fields">
          <SelectField label="¿Cuántos días puedes entrenar?" icon={CalendarDays} value={days} onChange={setDays} options={['2 días por semana','3 días por semana','4 días por semana','5 días por semana']}/>
          <SelectField label="Nivel de experiencia" icon={BarChart3} value={level} onChange={setLevel} options={['Inicial','Intermedio','Avanzado']}/>
          <SelectField label="Material disponible" icon={Dumbbell} value={equipment} onChange={setEquipment} options={['Gimnasio (máquinas y mancuernas)','En casa (mancuernas)','En casa (sin material)','Gimnasio completo']}/>
        </div>
      </section>
      <section className="recipe-section">
        <div className="recipe-heading"><NumberStep number="2"><h2>Tu Receta PAUSA</h2><p>Una propuesta base que puedes personalizar según tus preferencias.</p></NumberStep><button className="generate-button" onClick={()=>setGenerated(true)}><Sparkles size={21}/> {generated?'Receta actualizada':'Generar mi receta PAUSA'} <ChevronRight size={22}/></button></div>
        {generated && <div className="generated-note"><Check size={16}/> Receta adaptada: {days.toLowerCase()}, nivel {level.toLowerCase()} y {equipment.toLowerCase()}.</div>}
        <div className="workout-cards"><WorkoutCard letter="A" duration="40–45 min" onClick={()=>setActiveWorkout('A')}/><WorkoutCard letter="B" duration="40–45 min" onClick={()=>setActiveWorkout('B')}/></div>
      </section>
      <section className="wheel-panel">
        <div className="wheel-title"><h2>Rueda PAUSA de la Fuerza</h2><p>Elige o cambia los ejercicios de cada patrón de movimiento.</p></div>
        <div className="wheel-content"><RecipeWheel/><div className="movement-list">{movementOptions.map(({key,icon:Icon,choices},i)=><label className="movement-row" key={key}><Icon size={25}/><b>{key}</b><span className="select-wrap"><select value={exercises[i]} onChange={e=>updateExercise(i,e.target.value)}>{choices.map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={16}/></span></label>)}</div></div>
      </section>
      <section className="cardio-strip"><HeartPulse size={42}/><div><strong>Capacidad cardiovascular</strong><span>Trabajo por intervalos, eficiente y adaptable.</span></div><span className="select-wrap cardio-select"><select value={cardio} onChange={e=>setCardio(e.target.value)}>{['Bicicleta estática','Cinta de correr','Elíptica','Remo','Caminar a paso ligero'].map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={16}/></span><div className="cardio-example"><Timer size={24}/><span>Ejemplo: 5 × 2 min intensos + 2 min suaves<br/>(≈ 12–15 min)</span></div></section>
    </div>
    <aside className="builder-aside">
      <div className="aside-heading"><NumberStep number="3"><h2>Tu entrenamiento personalizado</h2><p>Según tus selecciones, esta es tu Receta PAUSA.</p></NumberStep></div>
      {['A','B'].map((letter,idx)=><section className="summary-workout" key={letter}><header><CalendarDays size={25}/><b>Entrenamiento {letter}</b><small>(≈ 40–45 min)</small></header>{(idx===0?[exercises[0],exercises[4],exercises[2]]:[exercises[1],exercises[5],exercises[3]]).map((ex,i)=><div className="summary-exercise" key={`${letter}-${i}`}><Dumbbell size={20}/><span>{ex}</span><b>3 × 8–12</b></div>)}<div className="summary-exercise cardio-line"><HeartPulse size={24}/><span>Cardio por intervalos<br/>({cardio})</span><b>10–15 min</b></div></section>)}
      <div className="aside-actions"><button onClick={()=>setDownloaded(true)}><Download size={21}/>{downloaded?'PDF preparado':'Descargar receta (PDF)'}</button><button onClick={()=>setSaved(!saved)}><Bookmark size={21} fill={saved?'currentColor':'none'}/>{saved?'Guardado':'Guardar en mis recursos'}</button></div>
      <section className="faq-panel"><div className="faq-title"><CircleHelp size={47}/><div><b>PAUSA Responde</b><span>Resuelve tus dudas más frecuentes.</span></div><ChevronRight size={25}/></div><div className="faq-questions">{questions.map(q=><button key={q} className={faq===q?'faq-active':''} onClick={()=>setFaq(faq===q?'':q)}>{q}</button>)}</div>{faq && <p className="faq-answer">{faq==='¿Sirve con solo 2 días?'?'Sí. La propuesta está diseñada para alternar las sesiones A y B y trabajar fuerza y capacidad cardiovascular.':faq==='¿Cómo elijo el peso?'?'Elige una carga que te permita completar las repeticiones con buena técnica y esfuerzo controlado.':faq==='¿Puedo cambiar ejercicios?'?'Sí. Puedes seleccionar una alternativa para cada patrón de movimiento en la Rueda PAUSA.':'Empieza con intervalos que puedas sostener y aumenta la intensidad progresivamente.'}</p>}</section>
    </aside>
  </div>;
}

export default function App() {
  const [activeNav,setActiveNav] = useState('Mi programa PAUSA');
  const [activeLesson,setActiveLesson] = useState(0);
  const [menuOpen,setMenuOpen] = useState(false);
  const lesson = lessonContent[activeLesson];
  const isBuilder = activeNav === 'Fuerza y capacidad cardiovascular';
  return <div className="app-shell">
    <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} open={menuOpen} onClose={()=>setMenuOpen(false)}/>
    <div className="main-area"><Header onMenu={()=>setMenuOpen(true)}/>
      {isBuilder ? <><Hero compact/><main className="builder-content"><TrainingBuilder/></main></> : <><Hero/><main className="content"><h2 className="section-heading"><span/>{lesson.heading}</h2><div className="lesson-layout"><LessonNav activeLesson={activeLesson} setActiveLesson={setActiveLesson}/><YouTubePlayer />{/* <VideoPlayer duration={lesson.duration}/> */}<LearningCard items={lesson.learn}/></div><Resources/></main></>}
    </div>
  </div>;
}
