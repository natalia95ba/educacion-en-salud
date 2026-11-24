#!/usr/bin/env python3
"""PAUSA v2: motor de referencia determinista y validador. Python 3.10+."""
import json, sys, itertools
from pathlib import Path

PATH=Path(__file__).with_name("PAUSA_biblioteca_entrenamientos_v2.json")
D=json.loads(PATH.read_text(encoding="utf-8"))
E=D["ejercicios"]
MATS={"ninguno","mochila","bandas","mancuernas","kettlebell"}
REQUIRES={"bicicleta","remo","skierg","eliptica"}

def resolve_exercise(exercise_id, pattern, level, place, materials):
    """No devuelve nunca equipamiento no seleccionado."""
    if place=="casa":
        for mat in ("mancuernas","kettlebell","mochila","bandas"):
            if mat in materials:
                replacement=D["reglas"]["seleccion_por_material"].get(mat,{}).get(pattern)
                if replacement and set(E[replacement]["material_obligatorio"]) <= materials:
                    return replacement
    original=E[exercise_id]
    if original["material_obligatorio"] and not set(original["material_obligatorio"]) <= materials and place=="casa":
        return D["reglas"]["variantes_por_patron"]["casa"][pattern][["inicial","intermedio","avanzado"].index(level)]
    return exercise_id

def generate(objetivo, dias, nivel, lugar="casa", modalidad="caminar", material=None,
             experiencia="regular", prioridad="equilibrado", equipo_cardio=None, alerta=False):
    material=set(material or [])
    if not material: material={"ninguno"}
    equipo_cardio=set(equipo_cardio or [])
    if alerta: raise ValueError("Requiere valoración individual: no generar plan estándar.")
    if objetivo not in D["distribuciones"] or dias not in (1,2,3,4) or nivel not in D["parametros"]["niveles"]:
        raise ValueError("Parámetros no admitidos")
    if lugar not in ("casa","gimnasio") or modalidad not in D["parametros"]["modalidades"]:
        raise ValueError("Lugar o modalidad no válidos")
    if not material <= MATS: raise ValueError("Material no reconocido")
    if objetivo!="fuerza" and modalidad in REQUIRES and modalidad not in equipo_cardio:
        raise ValueError("Confirma disponibilidad del equipo cardiovascular")
    # Prioridades pueden cambiar la distribución de 3–4 días combinados.
    pattern=D["distribuciones"][objetivo][str(dias)].copy()
    if objetivo=="combinado" and dias==3 and prioridad=="resistencia":
        pattern=["R_A","F_A","R_B"]
    if objetivo=="combinado" and dias==4 and prioridad=="fuerza":
        pattern=["F_A","R_A","F_B","F_C"]
    if objetivo=="combinado" and dias==4 and prioridad=="resistencia":
        pattern=["R_A","F_A","R_B","R_C"]
    sessions=[]
    for key in pattern:
        family,letter=key.split("_")
        if family=="F":
            s=dict(D["sesiones_fuerza"][f"F_{nivel}_{lugar}_{letter}"])
            s["parte_principal"]=[dict(item, ejercicio_id=resolve_exercise(item["ejercicio_id"],E[item["ejercicio_id"]]["patron"],nivel,lugar,material)) for item in s["parte_principal"]]
            if experiencia=="paron":
                s["parte_principal"]=[dict(item,series=max(1,item["series"]-1)) for item in s["parte_principal"]]
        elif family=="R":
            s=dict(D["sesiones_resistencia"][f"R_{nivel}_{modalidad}_{letter}"])
            if modalidad=="carrera" and experiencia=="paron":
                s["parte_principal"]={"formato":"caminar_correr","repeticiones":6,"trabajo_seg":60,"recuperacion_seg":180,"rpe_trabajo":[3,4],"nota":"Caminar en recuperación; si trotar no es tolerable, caminar todo el bloque."}
                s["duracion_estimada_min"]=37
        else:
            s=dict(D["sesiones_combinadas"][f"M_{nivel}_{lugar}_{modalidad}_{letter}"])
            s["fuerza"]=[dict(item,ejercicio_id=resolve_exercise(item["ejercicio_id"],E[item["ejercicio_id"]]["patron"],nivel,lugar,material),
                         series=1 if experiencia=="paron" else item["series"]) for item in s["fuerza"]]
        sessions.append(s)
    return {"objetivo":objetivo,"dias":dias,"nivel":nivel,"lugar":lugar,"modalidad":modalidad,
            "material":sorted(material),"experiencia":experiencia,"prioridad":prioridad,
            "sesiones":sessions,"horizonte_semanas":6,"estado":"propuesta inicial: requiere seguimiento y ajustes"}

def validate():
    issues=[]
    def check(test,msg):
        if not test: issues.append(msg)
    check(len(E)>=60,"catálogo insuficiente")
    check(len(D["sesiones_fuerza"])==24,"conteo fuerza")
    check(len(D["sesiones_resistencia"])==72,"conteo cardio")
    check(len(D["sesiones_combinadas"])==72,"conteo mixto")
    check(len(D["sesiones_expres"])==42,"conteo exprés")
    for family in ("sesiones_fuerza","sesiones_combinadas","sesiones_expres"):
        for sid,s in D[family].items():
            items=s.get("parte_principal",[])
            if isinstance(items,dict): items=items.get("ejercicios",items.get("fuerza",[]))
            if family=="sesiones_combinadas":items=s["fuerza"]
            for item in items:
                check(item["ejercicio_id"] in E,f"{sid}: ejercicio desconocido")
                if s.get("lugar")=="casa" and item["ejercicio_id"] in E:
                    check(not E[item["ejercicio_id"]]["material_obligatorio"],f"{sid}: base casa requiere material")
    cases=0
    for obj,dias,lv,place,mode in itertools.product(["fuerza","resistencia","combinado"],[1,2,3,4],
                                                     ["inicial","intermedio","avanzado"],["casa","gimnasio"],
                                                     ["caminar","carrera","bicicleta","remo","skierg","eliptica"]):
        try:
            plan=generate(obj,dias,lv,place,mode,material=["ninguno"],equipo_cardio=[mode] if mode in REQUIRES else [])
            check(len(plan["sesiones"])==dias,"número sesiones incorrecto")
            for s in plan["sesiones"]:
                check("calentamiento" in s and "vuelta_calma" in s,f"faltan fases {s['id']}")
                items=s.get("parte_principal",[]) if s["objetivo"]=="fuerza" else s.get("fuerza",[])
                for item in items:
                    ex=E[item["ejercicio_id"]]
                    if place=="casa": check(not ex["material_obligatorio"],f"casa sin material: {ex['id']}")
            cases+=1
        except Exception as ex: issues.append(f"Fallo {obj}/{dias}/{lv}/{place}/{mode}: {ex}")
    # No se permite equipo de cardio no confirmado
    try:
        generate("resistencia",2,"inicial",modalidad="remo")
        issues.append("No bloqueó remo sin equipamiento confirmado")
    except ValueError: pass
    return {"combinaciones_comprobadas":cases,"ejercicios":len(E),
            "plantillas":sum(len(D[k]) for k in ["sesiones_fuerza","sesiones_resistencia","sesiones_combinadas","sesiones_expres"]),
            "errores":issues,"resultado":"OK" if not issues else "REVISAR"}

if __name__=="__main__":
    result=validate()
    print(json.dumps(result,ensure_ascii=False,indent=2))
    if result["errores"]:sys.exit(1)
