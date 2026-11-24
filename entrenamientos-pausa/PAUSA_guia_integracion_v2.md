# PAUSA — Biblioteca de entrenamiento v2
**Entrega técnica · 20/11/2026 · Estado: preproducción**

## Archivos
- `PAUSA_biblioteca_entrenamientos_v2.json`: catálogo, plantillas y reglas.
- `PAUSA_motor_referencia_v2.py`: motor determinista de referencia y pruebas.
- `PAUSA_guia_integracion_v2.md`: este documento.

## Alcance real
La biblioteca incluye **64 ejercicios**, **24 plantillas de fuerza**, **72 de resistencia**, **72 mixtas** y **42 exprés** (210 plantillas). Una plantilla no equivale a un programa completo: las combinaciones semanales se componen con reglas y selección de material. El script verifica 432 combinaciones básicas de objetivo × días × nivel × lugar × modalidad. Estas pruebas son **estructurales**, no ensayos clínicos ni validación de eficacia.

Se han conservado las 3 familias de objetivo, los 4 días posibles, los 3 niveles, las 6 modalidades cardiovasculares, la organización de sesiones A–D y el formato exprés de la v1. Se han reemplazado las prescripciones con equipamiento implícito en casa y se ha separado el catálogo de ejercicios del generador.

## Cómo integrarlo
1. Copiar el JSON a la carpeta de datos del proyecto, sin modificar la estructura de la aplicación.
2. Leer `parametros` y construir los campos condicionales del formulario.
3. Validar las respuestas **antes** de resolver sesiones. En casa, «ninguno» implica únicamente material_obligatorio vacío.
4. Resolver la distribución de `distribuciones` y, según el caso, consultar `sesiones_fuerza`, `sesiones_resistencia` o `sesiones_combinadas`.
5. Para fuerza en casa, aplicar `reglas.seleccion_por_material` únicamente cuando el usuario haya seleccionado expresamente ese material; si no, mantener el ejercicio sin material.
6. Para modalidades con equipo, confirmar disponibilidad. Nunca asumir que el usuario tiene SkiErg o remo por entrenar en casa.
7. Construir la vista con calentamiento, parte principal y vuelta a la calma. Resolver los `ejercicio_id` en `ejercicios` para mostrar nombre e instrucciones.
8. Vincular la alternativa exprés mediante tipo, nivel, lugar y letra. Las exprés de resistencia se indexan por modalidad y nivel.
9. Guardar programa generado, versión, sesiones realizadas y feedback. Las progresiones de `reglas.progresion` son condiciones de decisión, no instrucciones de incrementar indiscriminadamente.
10. Ejecutar el validador y completar las pruebas de UI y de contenido antes de publicar.

**Atención:** el script Python es una referencia de lógica, **no** código listo para integrar directamente en React/Next.js. La implementación real deberá portar las reglas al lenguaje del proyecto, conservar los IDs y añadir persistencia, autenticación y pruebas end-to-end.

## Límites técnicos y científicos que NO deben ocultarse
- **Tracción sin material:** no existe sustitución plenamente equivalente a un remo o jalón con carga. Se ofrece autorresistencia con advertencia explícita. No llamar a estas sesiones «equivalentes al gimnasio».
- **Tiempo:** las duraciones de fuerza y mixtas son intervalos estimados, no cronometrajes exactos. Antes de publicar debe implementarse un estimador que contabilice cada lado, cada serie, descansos, cambios de máquina y series de aproximación. Si excede 60 minutos, reducir accesorios o volumen; no acortar descansos de forma indiscriminada.
- **Progresión:** las reglas generales requieren datos del usuario. No aumentar intensidad por el simple paso de una semana.
- **Nivel:** no es una medición clínica ni una evaluación real de fuerza. El rendimiento por patrón debe corregir el nivel declarado.
- **Experiencia específica:** la carrera requiere progresión propia, incluso en personas con gran capacidad aeróbica en bicicleta.
- **Seguridad:** la detección de molestias, embarazo, enfermedades, síntomas de alarma y situaciones especiales exige un flujo de valoración y derivación. No se debe convertir un campo de texto libre en diagnóstico automático.
- **Vídeos:** todos los ejercicios están marcados con `video_url: null` y `revisado_video: false`. Antes de publicar fichas o vídeos deben revisarse por profesional competente.
- **Mochila:** solo usar cargas estables, bolsa cerrada y agarres seguros. El usuario debe poder elegir «sin material» sin verse obligado a usarla.
- **Cardio en casa:** no suponer máquinas disponibles; la selección de modalidad no verifica por sí sola la propiedad del aparato.
- **Cardio y salud:** la biblioteca usa RPE y prueba del habla; no pretende fijar umbrales ventilatorios o intensidades personalizadas sin mediciones.

## Dosis y criterios de control
- Fuerza inicial: referencia RIR 3–4; intermedio RIR 2–3; avanzado RIR 1–3, siempre modulable.
- Fuerza en casa: progresar de variantes sencillas a más exigentes, usar unilateralidad y pausas cuando tengan sentido. El trabajo por repeticiones es la opción predominante; planchas/isometrías por segundos.
- Cardio: continuo o intervalos con trabajo y recuperación explícitos; RPE 0–10. En iniciación a la carrera, caminar/trotar o caminar según tolerancia.
- Exprés: 4 min de preparación + 13 min de bloque principal + 3 min de cierre. No equivalen en volumen a sesiones completas.
- Programa: mantener una estructura reconocible durante 4–6 semanas y modificarla según cumplimiento, esfuerzo y molestias.

## Pendientes antes del lanzamiento
**P0 — imprescindibles**
1. Revisión profesional individual de los 64 ejercicios, incluyendo indicaciones, dosis, alternativas y seguridad.
2. Implementar y probar el cálculo real de duración de fuerza y mixtas; no mostrar «60 min exactos» sin cálculo.
3. Integrar selector real de material y equipamiento cardiovascular con bloqueos por incompatibilidad.
4. Añadir flujo de seguridad y gestión de situaciones que no admiten prescripción genérica.
5. Crear pruebas automatizadas de todas las opciones de materiales y prioridades; los 432 casos actuales cubren solo combinaciones estructurales.
6. Validar el reparto semanal por patrones y volumen de fuerza, en especial las sesiones de 1–2 días mixtas.
7. Revisión del tiempo efectivo de las exprés en condiciones reales (cambios de estación).
8. Sustituir o marcar como limitada la tracción sin material en el mensaje al usuario.

**P1 — calidad diferencial**
9. Fichas/vídeos por ejercicio con instrucciones de ejecución, errores frecuentes y variantes.
10. Feedback de RIR, repeticiones, cargas, RPE y molestias por sesión.
11. Reglas de progreso por ejercicio/patrón y de fatiga semanal.
12. Pruebas con usuarios iniciales, intermedios y avanzados; revisión de adherencia y comprensión.
13. Revisión de accesibilidad y usabilidad móvil.

## Ejemplo de uso del motor de referencia
```python
from PAUSA_motor_referencia_v2 import generate
plan = generate(
    objetivo="combinado", dias=3, nivel="intermedio",
    lugar="casa", modalidad="caminar",
    material=["ninguno"], experiencia="regular",
    prioridad="equilibrado"
)
```

## Decisiones de producto recomendadas
- Mostrar «Plan PAUSA» y «Hoy solo tengo 20 minutos» como acciones separadas.
- No forzar un calendario semanal fijo.
- Explicar RIR y RPE con un desplegable de ayuda.
- No llamar «inteligencia artificial» al motor determinista ni afirmar superioridad demostrada frente a entrenadores.
- El usuario debe saber que se trata de una propuesta general adaptable, no de una valoración clínica individual.

## Fuentes metodológicas para revisión posterior
La estructura está alineada conceptualmente con principios ampliamente aceptados de entrenamiento de fuerza y ejercicio aeróbico (sobrecarga progresiva, especificidad, autorregulación, distribución de carga). Para revisión editorial y actualización científica se recomienda contrastar las prescripciones con guías vigentes de ACSM, OMS y consensos específicos de fuerza, resistencia y seguridad del ejercicio. No se ha realizado aquí una revisión sistemática de literatura ni validación externa del algoritmo.
