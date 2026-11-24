# PAUSA V3 · Especificación funcional y reglas de prescripción

**Estado:** referencia técnica de preproducción, pendiente de revisión profesional individual de ejercicios, sesiones y dosificación. **No** afirmar que las pruebas de código demuestran eficacia o seguridad clínica.

## 1. Contrato del cuestionario

- `objetivo`: `bienestar | hipertrofia | cardio | general`.
- `dias`: entero 1–4; `nivel`: `principiante | intermedio | avanzado`.
- `lugar`: `casa | gimnasio`. Si `casa`, selección múltiple `material`: `ninguno` (exclusivo), `mancuernas`, `bandas`, `kettlebell`, `barra_discos`, `banco`, `trx`, `maquina_cardio`. En gimnasio se supone equipamiento habitual, pero se debe verificar la disponibilidad de implementos concretos.
- `contraindicacion`: `no | si | duda`. Para `si` o `duda`, no generar programa automático; recomendar valoración profesional. No realizar diagnóstico ni solicitar historial clínico adicional.
- Modalidad cardiovascular elegida **en la sesión**: `caminar | caco | correr | bicicleta`, no sexta pregunta inicial. Confirmar disponibilidad de bicicleta antes de prescribirla. Si correr, preguntar condicionalmente capacidad continua cómoda: `todavia_no | menos_5 | 5_10 | 10_20 | mas_20`. El nivel general no sustituye la capacidad específica de carrera.
- `ajuste_etapa_caco`: -1, 0 o +1 respecto de etapa base, limitado a etapas existentes; persistir selección localmente sin registrar sesiones.

## 2. Distribución semanal

El motor de referencia contiene la matriz exacta en `weekly_types()`. Con 2–4 días habrá **dos exposiciones de fuerza como mínimo**. Un día: sesión de cuerpo completo mixta. Hipertrofia 2–4 días: priorizar fuerza; 2 días siempre cuerpo completo A/B. Cardio 4 días: 2 fuerza y 2 cardio. Bienestar/general: combinación flexible. A/B/C/D son secuencias, no lunes/martes. Sugerir recuperación entre sesiones intensas; no bloquear calendarios.

## 3. Fuerza

- Selección por patrón, material realmente disponible, estímulo y seguridad; no incrementar dificultad técnica automáticamente con el nivel. Patrones: sentadilla, unilateral, bisagra, empuje, tracción, empuje vertical, core, pantorrilla.
- Estabilidad de ejercicios principales al regenerar: **reconciliar por ID de ejercicio** si siguen siendo válidos y la estructura lo permite. El motor Python es determinista para el mismo cuestionario, pero la reconciliación de un plan previo corresponde a la implementación web.
- RPE de fuerza inicial orientativo: principiante 6–7, intermedio 7–8, avanzado 7–9; RIR aproximado = 10−RPE, sin interpretar como equivalencia exacta. Series orientativas 2–4 por ejercicio, adaptables. Descansos compuestos 120–180 s, accesorios 60–120 s, orientativos, no cronómetros obligatorios.
- Doble progresión: mantener rango de repeticiones y RPE, aumentar repeticiones con técnica y control; cuando se alcanza el extremo superior en todas las series con RPE objetivo, subir carga moderadamente si existe; sin cargas, usar variante viable y explicar limitaciones.
- Rangos de hipertrofia de referencia, **no cuotas garantizadas**: principiante 4–8, intermedio 6–12, avanzado 8–16 series semanales directas equivalentes por músculo. El conteo debe diferenciar músculo principal y secundario; no atribuir una serie completa a todos los músculos implicados. Con un día, poco material o poco tiempo, priorizar cobertura y transparencia frente a simular volumen óptimo.
- No sustituir tracción cargada por autorresistencia como si fueran equivalentes. Evitar ejercicios técnicos avanzados por defecto y bajo fatiga.

## 4. Cardio

- Caminata con cambios de ritmo moderados, carrera continua o intervalos según capacidad, CACO con etapas elegibles y bicicleta continua/intervalos.
- RPE cardio: 2–3 suave, 4–5 moderado, 6–7 exigente, 8–9 solo cuando proceda en personas entrenadas. Prueba del habla como guía adicional.
- CACO etapas ilustrativas: 8×(60 s trote+120 s caminar); 8×(90+90); 6×(120+120); 6×(180+120). No avanzar automáticamente por semanas: `siguiente`, `mantener`, `anterior` según tolerancia. No asumir que bici, carrera y caminar producen estímulos equivalentes por igual tiempo.
- Dosificar considerando fatiga de fuerza, modalidad y objetivo; no introducir intervalos duros sistemáticamente en principiantes ni en sesiones exprés.

## 5. Sesiones y duración

- Calentamiento concreto: movimientos, repeticiones/segundos, progresión y aproximaciones con carga cuando proceda. Vuelta a la calma opcional/contextual, sin estiramientos de relleno.
- Sesión habitual **aproximadamente 60 min**; 50–70 como orientación, no corte duro. Una sesión de 30–50 min puede ser coherente si el volumen útil ya es apropiado; **no inventar ejercicios para llenar tiempo**. Mostrar duración calculada, no prometer 60 exactos.
- Exprés objetivo 20 min, diseñada independientemente con menos ejercicios/series o menor bloque cardiovascular; no equivale a la dosis completa. Referencia de revisión 15–25 min, preferencia 18–22 min.
- Estimación: calentamiento + tiempo por serie (incluyendo ambos lados en unilateral) + descansos entre series + cambios de estación + cardio completo + cierre. La variabilidad real puede ser importante.
- Formatos elegibles: series tradicionales, superseries compatibles, rondas, circuitos temporizados, AMRAP/EMOM **submáximos y explicados sin jerga** cuando proceda. El motor de referencia implementa series y bloques cardio; Codex puede añadir formatos adicionales únicamente tras preservar los controles de volumen, descanso y fatiga.

## 6. Validación y corrección

**Bloqueantes:** contraindicaciones `si/duda`; material no confirmado; modalidad inválida; ausencia de ejercicios; errores estructurales. **Corrección automática:** sustitución por ejercicio compatible, ajuste prudente de accesorios, duración cardio, descansos y series manteniendo prioridad fisiológica. **Avisos transparentes:** equipamiento insuficiente, duración fuera de referencia, imposibilidad de lograr dosis ideal. Nunca ocultar una carencia con equivalencias falsas.

Revisar distribución semanal por patrones, exposición de fuerza, series principales/secundarias, fatiga de tren inferior, intensidad cardiovascular, unilateralidad y tiempo. Los tests estructurales no verifican por sí solos la calidad del estímulo; se requiere revisión humana de perfiles exportados.

## 7. Persistencia y experiencia

- Guardar solo **cuestionario y programa vigente** en `localStorage`, con versión de esquema y marca de fecha. Sin historial, cuentas, backend, seguimiento de sesiones ni gráficas.
- Al modificar respuestas, regenerar plan y preservar IDs principales compatibles si es posible. Solo sustituir programa almacenado tras validación exitosa; si falla, conservar el anterior y mostrar error útil.
- Mostrar serie, repeticiones, RPE, descanso, instrucciones breves; detalle adicional desplegable. No ofrecer botón para sustituir ejercicios individualmente. Recursos de imagen/vídeo opcionales y nulos por defecto; no bloquear la interfaz por falta de vídeo.
- Datos del navegador no se sincronizan entre dispositivos; borrado del navegador puede eliminar el plan.

## 8. Criterios de aceptación

1. Misma entrada = mismo plan salvo cambios de versión o modificación explícita.
2. Ningún ejercicio requiere material no seleccionado.
3. Dos o más días = al menos dos exposiciones de fuerza.
4. Correr requiere comprobación específica de capacidad; principiantes de carrera no reciben series rápidas por defecto.
5. La sesión exprés se construye por separado y es factible.
6. Seguridad `si/duda` bloquea prescripción.
7. Advertencias honestas para tracción e hipertrofia sin material.
8. Cambios de cuestionario mantienen continuidad cuando sea viable y sustituyen solo plan actual.
9. Revisión profesional manual de los perfiles de ejemplo y pruebas en interfaz móvil antes de publicación.

**Nota de implementación:** las pruebas actuales son estructurales y la referencia Python todavía tiene limitaciones explícitas (p. ej. algunas sesiones cortas, conteo muscular simplificado, reconciliación entre planes a implementar en frontend). Codex no debe tratarlas como aceptación final de calidad.
