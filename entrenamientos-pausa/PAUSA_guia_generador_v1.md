# PAUSA — Biblioteca del generador de entrenamientos (versión 1, borrador técnico)

## Entregables
El archivo `pausa_biblioteca_entrenamientos_v1.json` contiene **210 plantillas de sesión**: 24 de fuerza, 72 de resistencia, 72 combinadas y 42 exprés. Estas plantillas se reutilizan para construir programas semanales, no son 210 programas semanales diferentes. Deben revisarse y probarse antes de publicar.

## Opciones del usuario
1. Objetivo: solo fuerza, fuerza + resistencia, solo resistencia.
2. Disponibilidad: 1, 2, 3 o 4 días por semana.
3. Nivel: inicial, intermedio, avanzado.
4. Lugar: casa o gimnasio (si hay fuerza).
5. Modalidad: caminar, carrera, bicicleta, remo, SkiErg, elíptica (si hay resistencia).
6. Formato: completo (hasta 60 min) o exprés (20 min). Se recomienda mostrar el exprés como alternativa accesible desde el resultado, no como una pregunta adicional inicial.

## Distribución semanal
| Objetivo | 1 día | 2 días | 3 días | 4 días |
|---|---|---|---|---|
| Fuerza | A | A+B | A+B+C | A+B+C+D |
| Resistencia | A | A+B | A+B+C | A+B+C+D |
| Combinado | Mixta A | Mixta A+B | Fuerza A + Resistencia A + Fuerza B | Fuerza A + Resistencia A + Fuerza B + Resistencia B |

No fijar lunes/martes ni suponer sesiones consecutivas. En combinado, con 1–2 días se mezclan fuerza y resistencia en una sesión; con 3–4 se separan.

## Esquema de sesiones
- **Fuerza**: calentamiento 8–10 min, 5 patrones de movimiento (sentadilla, bisagra, empuje, tracción, unilateral/core/transporte, según sesión), series y descansos por nivel; hasta 60 min.
- **Resistencia**: calentamiento progresivo 5–10 min, bloque continuo o interválico, 5 min suaves de salida. Intensidad RPE 0–10, no velocidades absolutas.
- **Mixta**: 8 min de calentamiento + ~30 min de fuerza (3 ejercicios) + ~17 min de cardio + 5 min de cierre. Total objetivo 60 min; en la práctica el tiempo depende de transiciones y material.
- **Exprés fuerza**: 4 min de preparación + circuito de 4 estaciones de 1 min × 3 rondas (12 min) + 4 min de cierre.
- **Exprés mixto**: 4 min de preparación + circuito de 3 estaciones de fuerza y una de cardio, 1 min cada una × 3 rondas + 4 min de cierre.
- **Exprés cardio**: 4 min de calentamiento + 12 min de intervalos + 4 min suaves.

## Reglas de progresión y seguridad
- Nivel inicial: RIR 3–4; intermedio: RIR 2–3; avanzado: RIR 1–3, sin perseguir el fallo muscular en todas las series.
- Para subir carga, priorizar técnica, rango de repeticiones y percepción de esfuerzo; incrementos pequeños cuando el trabajo resulte manejable de forma consistente.
- Para cardio, usar RPE y prueba del habla; los protocolos de intervalos son propuestas generales y deben ajustarse según tolerancia y experiencia en la modalidad.
- Las opciones avanzadas no equivalen a supervisión individual. No sustituye una valoración ante síntomas, enfermedades o lesiones.
- En el hogar, algunos ejercicios requieren mochila, banda, mancuerna o un anclaje seguro. No presentar la opción «casa» como «sin material»; verificar material disponible o ofrecer alternativas reales.
- Los intervalos de carrera no son necesariamente apropiados para quien empieza desde cero; comenzar caminando o alternando caminar/correr según tolerancia.

## Precauciones de calidad antes de publicar
1. Revisar con criterio profesional cada ejercicio, su material, la dosis y las instrucciones.
2. Confirmar que el material del usuario existe (casa no significa sin equipamiento).
3. Revisar las estimaciones de tiempo de cada sesión y ajustar series/transiciones.
4. Definir vídeos o fichas técnicas para cada ejercicio.
5. Probar las 3 × 4 combinaciones de objetivo y días, con sus niveles, lugares y modalidades aplicables.
6. Verificar que una sesión exprés se presenta como alternativa de contingencia, no como equivalente a 60 minutos.
7. Evitar afirmaciones de prevención garantizada de lesiones o resultados asegurados.

## Implementación en Codex
1. Cargar JSON desde un módulo de datos estático (sin generación por IA).
2. Aplicar `distribuciones[objetivo][dias]`.
3. Resolver identificadores `F_A`, `R_B`, `M_A` con las claves `nivel_lugar_letra`, `nivel_modalidad_letra`, `nivel_lugar_modalidad_letra`.
4. Renderizar tarjetas de sesiones y sus detalles (ejercicios, dosis, descansos, intensidad, modalidad).
5. Para exprés: según objetivo seleccionar fuerza, mixto o resistencia; reutilizar nivel/lugar/modalidad. Alternar A/B en fuerza o mixto cuando corresponda.
6. Mantener el generador dentro de `/fuerza` sin navegar a otra página.
7. Si falta una combinación o no se dispone del material, mostrar un estado claro; nunca inventar ejercicios en tiempo de ejecución.

**Estado:** borrador técnico de contenido para validación y edición; no biblioteca clínica certificada.
