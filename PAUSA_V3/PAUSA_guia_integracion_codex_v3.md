# PAUSA V3 · Guía maestra para Codex

## OBJETIVO
Integrar una biblioteca independiente de ejercicios y un generador de programas de fuerza/cardio adaptados al usuario en la web PAUSA, **sin reconstruir la aplicación existente**. El contenido funcional ha sido aprobado por el profesional responsable. No solicitar otra revisión editorial o profesional como condición de integración. Codex debe completar las funcionalidades técnicas pendientes, superar las pruebas y mostrar al usuario final solo el programa y sus instrucciones, sin etiquetas de prototipo ni mensajes de revisión.

## FASE 1 — SOLO INSPECCIONAR Y PROPONER (NO EDITAR CÓDIGO)

1. Inspecciona el repositorio, dependencias, componentes del cuestionario, rutas, tipos de datos, estado, persistencia y tests. Identifica si usa TypeScript/JavaScript, React/Next.js u otra arquitectura; no presupongas tecnologías.
2. Lee **todos** los archivos V3. Contrasta las claves del cuestionario y las opciones actuales con `PAUSA_reglas_programacion_v3.md`.
3. Presenta tabla: componente existente → conservar/adaptar/crear → archivos afectados → riesgo y pruebas.
4. Explica cómo portar el motor Python al lenguaje del proyecto, cómo tipar datos y cómo preservar la determinación y la validación.
5. Identifica divergencias entre el motor de referencia y la especificación funcional, especialmente: tiempo de sesiones de fuerza, volumen por músculo, formatos alternativos, continuidad entre planes, variación de material, control de carga semanal y UI del selector cardio. Propón correcciones, sin hacerlas todavía.
6. Presenta un plan de implementación por pasos con pruebas y pide autorización expresa antes de editar.

## FASE 2 — SOLO TRAS APROBACIÓN DEL PLAN

1. Crear esquema/tipos, importador JSON, motor determinista y validador en el stack existente.
2. Respetar el cuestionario de cinco preguntas, la pregunta condicional de capacidad de carrera y confirmación de bicicleta. El selector de modalidad pertenece a la sesión cardiovascular.
3. Generar sesiones A–D y versión exprés por sesión. Estimar tiempos reales, contabilizando unilateralidad y descanso. La duración habitual ≈60 min es **aproximada**; no añadir relleno ni recortar estímulos prioritarios para cuadrar el reloj.
4. Implementar reglas de selección por equipo real, volumen, fatiga, frecuencia y RPE; dar avisos transparentes si la dosis no es viable.
5. Aplicar validación y corrección antes de mostrar; bloquear si contraindicación `si/duda`.
6. Guardar únicamente cuestionario y plan vigente en `localStorage`; migrar/invalidar versiones antiguas de manera segura; preservar el plan anterior si falla la nueva generación; no mantener historial de versiones.
7. Al modificar respuestas, preservar IDs de ejercicios principales compatibles cuando sea apropiado. Sin botón de sustitución individual ni registro de sesiones.
8. Añadir tests de unidad y casos extremos, portar los 384 perfiles combinatorios y comprobar perfiles completos exportados. Añadir pruebas de UI y accesibilidad móvil. La interfaz final debe mostrar las sesiones reales al usuario, no los JSON ni los informes técnicos.
9. Entregar un informe de diferencias con la referencia, pruebas ejecutadas, riesgos pendientes y verificación técnica de funcionamiento, accesibilidad y regresiones. La revisión profesional del contenido ya está aprobada por el responsable.

## ARCHIVOS

- `PAUSA_biblioteca_ejercicios_v3.json`: catálogo normalizado y parámetros.
- `PAUSA_reglas_programacion_v3.md`: fuente funcional prioritaria de criterios de programación.
- `PAUSA_plantillas_sesiones_v3.json`: arquetipos de sesiones.
- `PAUSA_motor_referencia_v3.py`: **referencia ejecutable**, no módulo web listo para producción.
- `PAUSA_pruebas_validacion_v3.py`: tests de estructura y determinismo.
- `PAUSA_perfiles_ejemplo_v3.json`: planes completos para revisión profesional.

## INSTRUCCIONES CRÍTICAS

- No copiar las dosis de V2: algunas sesiones mixtas infradosificaban fuerza.
- No presentar 60 minutos exactos si la estimación difiere; no presentar 20 minutos exactos si la sesión real no encaja.
- No asumir equipamiento no confirmado, especialmente tracción en casa y bicicleta.
- No convertir la experiencia general en experiencia de carrera.
- No afirmar que superar tests automatizados implica validación científica o clínica.
- No publicar vídeos nulos ni inventar enlaces de demostración.
- No añadir backend, login, métricas ni seguimiento de sesiones.
- Mantener interfaz comprensible para adultos con poco tiempo, sin jerga competitiva.

## ORDEN DE PRECEDENCIA

1. Decisiones de producto y criterios de `PAUSA_reglas_programacion_v3.md`.
2. Restricciones del esquema de biblioteca.
3. Motor Python y plantillas como **referencias técnicas que deben completarse antes de desplegar**.

Si la referencia contradice un criterio funcional, documenta la discrepancia y propón una solución en Fase 1, sin modificar código.

## EXPERIENCIA FINAL DEL USUARIO — OBLIGATORIA
- Pantalla inicial con cuestionario de cinco preguntas, controles claros y una única acción «Crear mi entrenamiento».
- Pantalla de programa: objetivo y frecuencia, tarjetas Sesión A/B/C/D, duración **estimada real**, objetivo de cada sesión y selector «Sesión completa / Versión de 20 minutos».
- Cada sesión: calentamiento concreto, ejercicios con series/repeticiones/RPE/descanso orientativo, bloque cardiovascular si corresponde, explicación técnica expandible y cierre sencillo.
- La modalidad cardiovascular se elige **dentro de cada sesión cardio**, no como sexta pregunta general. Solicitar capacidad de carrera solo al seleccionar correr/CACO y confirmar bicicleta cuando corresponda.
- Acciones «Modificar mis respuestas» y «Volver a mi programa». Al confirmar cambios, guardar solo plan vigente, preservar ejercicios compatibles y conservar el anterior si falla la generación.
- No mostrar mensajes «pendiente de revisión», «prototipo», «preproducción» ni trazas internas. Sí mostrar límites reales del material, precauciones pertinentes y tiempos estimados con honestidad.
- No mostrar «20 minutos» cuando el cálculo supere el margen acordado; corregir composición y estimación antes de presentar.
- **No dar por implementadas** funciones que el motor Python de referencia aún no resuelve: volumen equivalente por músculo, reconciliación de plan y selector cardio por sesión. Codex debe implementarlas y probarlas antes de publicar.
