"""Pruebas reproducibles: ejecutar python PAUSA_pruebas_validacion_v3.py"""
from PAUSA_motor_referencia_v3 import generate,validate,PlanError
import itertools,json,pathlib

def run():
 count=0
 for goal,days,level,place,mode in itertools.product(['bienestar','hipertrofia','cardio','general'],range(1,5),['principiante','intermedio','avanzado'],['casa','gimnasio'],['caminar','caco','correr','bicicleta']):
  q={'objetivo':goal,'dias':days,'nivel':level,'lugar':place,'contraindicacion':'no','material':['ninguno'] if place=='casa' else [],'modalidad':mode,'capacidad_correr':'menos_5','bicicleta_confirmada':True}
  p=generate(q)
  assert p['estado']=='listo' and len(p['sesiones'])==days
  assert not validate(p)
  assert all(s['alternativa_expres']['duracion_estimada_min']<=25 for s in p['sesiones'])
  assert json.dumps(p,sort_keys=True)==json.dumps(generate(q),sort_keys=True)
  if days>=2:assert sum(bool(s['fuerza']) for s in p['sesiones'])>=2
  count+=1
 for state in ['si','duda']:
  p=generate({'objetivo':'bienestar','dias':2,'nivel':'principiante','lugar':'casa','material':['ninguno'],'contraindicacion':state})
  assert p['estado']=='requiere_valoracion' and not p['sesiones']
 for bad in [dict(objetivo='general',dias=2,nivel='intermedio',lugar='casa',material=['ninguno','mancuernas'],contraindicacion='no'),dict(objetivo='general',dias=2,nivel='intermedio',lugar='casa',material=['ninguno'],contraindicacion='no',modalidad='bicicleta')]:
  try:generate(bad)
  except PlanError:pass
  else:raise AssertionError('No rechazó configuración inválida')
 samples=[('principiante_sin_material',{'objetivo':'bienestar','dias':2,'nivel':'principiante','lugar':'casa','material':['ninguno'],'contraindicacion':'no','modalidad':'caminar'}),('hipertrofia_intermedio_gimnasio',{'objetivo':'hipertrofia','dias':3,'nivel':'intermedio','lugar':'gimnasio','contraindicacion':'no','modalidad':'caminar'}),('avanzado_sin_material',{'objetivo':'hipertrofia','dias':1,'nivel':'avanzado','lugar':'casa','material':['ninguno'],'contraindicacion':'no','modalidad':'caminar'}),('caco_novato',{'objetivo':'cardio','dias':3,'nivel':'intermedio','lugar':'casa','material':['ninguno'],'contraindicacion':'no','modalidad':'correr','capacidad_correr':'menos_5'}),('general_cuatro_dias',{'objetivo':'general','dias':4,'nivel':'intermedio','lugar':'gimnasio','contraindicacion':'no','modalidad':'bicicleta'})]
 out={name:generate(q) for name,q in samples}
 (pathlib.Path(__file__).parent/'PAUSA_perfiles_ejemplo_v3.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf8')
 print('OK:',count,'combinaciones; seguridad, incompatibilidades y determinismo; 5 perfiles de revisión exportados')
 print('Duraciones de ejemplo:')
 for name,p in out.items():print(name,[(s['letra'],s['tipo'],s['duracion_estimada_min'],s['alternativa_expres']['duracion_estimada_min']) for s in p['sesiones']])
if __name__=='__main__':run()
