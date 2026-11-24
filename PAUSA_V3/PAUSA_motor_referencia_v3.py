"""PAUSA V3: motor de referencia determinista, sin dependencias externas.
No es un componente web; Codex debe portarlo tras inspeccionar la aplicación.
"""
import json, pathlib, hashlib
DATA=json.loads((pathlib.Path(__file__).parent/'PAUSA_biblioteca_ejercicios_v3.json').read_text(encoding='utf8'))
INDEX={e['id']:e for e in DATA['ejercicios']}
LETTERS='ABCD'

class PlanError(ValueError):pass

def normalize(q):
 q=dict(q)
 if q.get('objetivo') not in DATA['parametros']['objetivos']:raise PlanError('Objetivo inválido')
 if q.get('dias') not in (1,2,3,4):raise PlanError('Días inválidos')
 if q.get('nivel') not in DATA['parametros']['niveles']:raise PlanError('Nivel inválido')
 if q.get('lugar') not in ('casa','gimnasio'):raise PlanError('Lugar inválido')
 if q.get('contraindicacion') not in ('no','si','duda'):raise PlanError('Indicar contraindicaciones: no, si o duda')
 mat=set(q.get('material',[])) if q['lugar']=='casa' else {'gimnasio','mancuernas','bandas','kettlebell','barra_discos','banco','trx'}
 allowed=set(DATA['parametros']['material_casa'])
 if q['lugar']=='casa' and (not mat or not mat<=allowed or ('ninguno' in mat and len(mat)>1)):raise PlanError('Material de casa inválido')
 if q['lugar']=='casa' and mat=={'ninguno'}:mat=set()
 q['material']=sorted(mat)
 if q.get('modalidad') and q['modalidad'] not in ('caminar','caco','correr','bicicleta'):raise PlanError('Modalidad inválida')
 if q.get('modalidad')=='bicicleta' and q['lugar']=='casa' and not q.get('bicicleta_confirmada',False):raise PlanError('Confirmar disponibilidad de bicicleta')
 if q.get('modalidad') in ('caco','correr') and q.get('capacidad_correr') not in DATA['parametros']['capacidad_correr']:raise PlanError('Indicar capacidad de carrera')
 if q.get('modalidad')=='correr' and q.get('capacidad_correr') in ('todavia_no','menos_5','5_10'):q['modalidad']='caco'
 return q

def weekly_types(goal,days):
 # Todos los perfiles con 2+ días conservan al menos dos exposiciones de fuerza.
 table={
 'bienestar':{1:['mixta'],2:['mixta','mixta'],3:['mixta','fuerza','cardio'],4:['mixta','fuerza','cardio','mixta']},
 'hipertrofia':{1:['mixta'],2:['fuerza','fuerza'],3:['fuerza','fuerza','fuerza'],4:['fuerza','fuerza','fuerza','fuerza']},
 'cardio':{1:['mixta'],2:['mixta','mixta'],3:['mixta','fuerza','cardio'],4:['fuerza','cardio','fuerza','cardio']},
 'general':{1:['mixta'],2:['mixta','mixta'],3:['mixta','fuerza','cardio'],4:['fuerza','cardio','fuerza','cardio']}}
 return table[goal][days]

def available(e,q):
 if q['lugar'] not in e['lugares']:return False
 return set(e['material_obligatorio']).issubset(set(q['material']))

def rank(e,q,pattern,letter):
 # La dificultad técnica no aumenta por nivel; el material capaz de cargar sí mejora prioridad.
 material=e['material_obligatorio']
 weighted={'gimnasio':4,'barra_discos':3,'mancuernas':3,'kettlebell':3,'bandas':2,'trx':2,'banco':1}
 load=sum(weighted.get(x,0) for x in material)
 if q['objetivo']=='hipertrofia':load*=2
 else:load*=1
 if q['nivel']=='principiante' and e['dificultad_tecnica']>2:load-=5
 if e['id'] in ('remo_isometrico_autorresistencia','tiron_isometrico_toalla'):load-=3
 # alternar selección accesoria pero conservar ejercicio estable por letra
 stable=int(hashlib.sha256((e['id']+letter).encode()).hexdigest()[:5],16)%7
 return (load, -e['dificultad_tecnica'],stable)

def select(pattern,q,letter,used):
 pool=[e for e in DATA['ejercicios'] if e['patron']==pattern and available(e,q) and e['id'] not in used]
 if not pool:return None
 return max(pool,key=lambda e:rank(e,q,pattern,letter))

def strength_patterns(goal,day_index,days,kind):
 # Las sesiones con fuerza cubren sentadilla, bisagra, empuje y tracción.
 if kind=='mixta':return ['sentadilla','bisagra','empuje','traccion'] if goal=='hipertrofia' else ['sentadilla' if day_index%2==0 else 'unilateral','bisagra','empuje','traccion']
 if goal=='hipertrofia':
  if days==4:
   return [['sentadilla','unilateral','bisagra','pantorrilla','core','sentadilla'],['empuje','traccion','empuje_vertical','traccion','core','empuje'],['bisagra','sentadilla','unilateral','pantorrilla','core','bisagra'],['traccion','empuje','empuje_vertical','traccion','core','empuje']][day_index]
  return [['sentadilla','bisagra','empuje','traccion','core','unilateral'],['unilateral','bisagra','empuje','traccion','empuje_vertical','core'],['sentadilla','unilateral','bisagra','traccion','empuje','core']][day_index%3]
 return ['sentadilla' if day_index%2==0 else 'unilateral','bisagra','empuje','traccion','core']

def strength_block(q,letter,index,kind):
 patterns=strength_patterns(q['objetivo'],index,q['dias'],kind)
 used=set();out=[]
 for pat in patterns:
  e=select(pat,q,letter,used)
  if not e and pat=='unilateral':e=select('sentadilla',q,letter,used)
  if not e:continue
  used.add(e['id'])
  sets=3 if q['objetivo']=='hipertrofia' and kind=='fuerza' else (3 if q['nivel']=='avanzado' and kind=='fuerza' else 2)
  if q['objetivo']=='hipertrofia' and q['nivel']=='avanzado' and kind=='fuerza' and pat in ('sentadilla','bisagra','empuje','traccion'):sets=4
  if kind=='mixta' and q['objetivo']=='hipertrofia':sets=3
  rpe={'principiante':6.5,'intermedio':7.5,'avanzado':8}[q['nivel']]
  if kind=='mixta' and q['objetivo']=='cardio':rpe=min(rpe,7)
  reps=e['rango_reps_referencia'] or [8,12]
  if e['patron']=='core' and e['id'].startswith('plancha'):reps=[20,40];unit='segundos'
  else:unit='repeticiones'
  rest=120 if pat in ('sentadilla','bisagra','unilateral','empuje','traccion') else 75
  out.append({'ejercicio_id':e['id'],'nombre':e['nombre'],'patron':pat,'series':sets,'rango':reps,'unidad':unit,'rpe_objetivo':rpe,'descanso_orientativo_seg':rest,'instruccion':e['instruccion_breve'],'por_lado':pat=='unilateral' or e['id'] in ('remo_mancuerna','remo_banco_mancuerna','remo_kb'),'musculo_principal':e['musculo_principal'],'musculo_secundario':e['musculo_secundario']})
 return out

def warmup(kind,exercise=None,express=False):
 if kind=='cardio':return [{'descripcion':'Comienza caminando o pedaleando muy suave','segundos':180 if express else 300},{'descripcion':'Aumenta progresivamente hasta un ritmo cómodo de trabajo','segundos':60 if express else 180}]
 steps=[{'descripcion':'Marcha suave y movilización cómoda de hombros y cadera','segundos':60 if express else 120},{'descripcion':'Sentadillas suaves y bisagras sin carga, 6–8 repeticiones de cada una','segundos':60 if express else 120}]
 if not express:steps.append({'descripcion':'1–2 series fáciles de aproximación al primer ejercicio, aumentando gradualmente si hay carga','segundos':180})
 return steps

def cardio_block(q,letter,index,kind,express=False):
 mode=q.get('modalidad') or 'caminar'
 if mode=='bicicleta' and q['lugar']=='casa' and not q.get('bicicleta_confirmada'):raise PlanError('Falta confirmar bicicleta')
 if mode=='correr' and q.get('capacidad_correr') in ('todavia_no','menos_5','5_10'):mode='caco'
 if mode=='caco':
  cap=q.get('capacidad_correr','todavia_no');stage={'todavia_no':0,'menos_5':0,'5_10':1,'10_20':2,'mas_20':3}[cap]
  stage=max(0,min(3,stage+int(q.get('ajuste_etapa_caco',0))))
  c=DATA['cardio']['caco_etapas'][stage]
  return {'modalidad':'caco','formato':'intervalos_caminar_correr','etapa':c['id'],'repeticiones':(min(c['repeticiones'],4) if express else c['repeticiones']),'trabajo_seg':c['correr_seg'],'recuperacion_seg':c['caminar_seg'],'rpe_trabajo':[3,5],'rpe_recuperacion':[2,3],'instruccion':'Alterna trote cómodo y caminata; no es un sprint. Avanza de etapa solo si la tolerancia lo permite.'}
 if mode=='caminar':
  if kind=='mixta':mins=9 if express else (13 if q['objetivo']=='hipertrofia' else 20)
  else:mins=12 if express else (38 if q['objetivo']=='cardio' else 32)
  return {'modalidad':'caminar','formato':'cambios_ritmo','repeticiones':max(2,mins//5),'trabajo_seg':180,'recuperacion_seg':120,'rpe_trabajo':[4,5],'rpe_recuperacion':[2,3],'instruccion':'Camina a paso vivo durante el trabajo y cómodo en la recuperación.'}
 if kind=='mixta':mins=9 if express else (14 if q['objetivo']=='hipertrofia' else 20)
 else:mins=12 if express else (38 if q['objetivo']=='cardio' else 32)
 if q['nivel']=='principiante' or (kind=='mixta' and q['objetivo']=='hipertrofia'):
  return {'modalidad':mode,'formato':'continuo','duracion_min':mins,'rpe':[3,5],'instruccion':'Ritmo conversacional y controlado; reduce intensidad si se altera mucho la respiración.'}
 if index%2==0:
  return {'modalidad':mode,'formato':'continuo','duracion_min':mins,'rpe':[4,5],'instruccion':'Esfuerzo estable y sostenible.'}
 reps=max(3,mins//5)
 return {'modalidad':mode,'formato':'intervalos','repeticiones':reps,'trabajo_seg':180,'recuperacion_seg':120,'rpe_trabajo':[6,7],'rpe_recuperacion':[2,3],'instruccion':'Intervalos controlados, sin buscar el máximo; ajusta según fatiga de piernas.'}

def cardio_minutes(b):
 if b['formato']=='continuo':return b['duracion_min']
 return b['repeticiones']*(b['trabajo_seg']+b['recuperacion_seg'])/60

def strength_minutes(items):
 total=0
 for e in items:
  # Tiempo por repetición 3 s; si unilateral, se hace por ambos lados.
  factor=2 if e['por_lado'] else 1
  seconds_per_set=(sum(e['rango'])/2)*3*factor if e['unidad']=='repeticiones' else sum(e['rango'])/2
  total+=e['series']*seconds_per_set/60+(e['series']-1)*e['descanso_orientativo_seg']/60+0.75
 return round(total,1)

def duration(session):
 warm=sum(s['segundos'] for s in session['calentamiento'])/60
 strength=strength_minutes(session.get('fuerza',[]))
 cardio=cardio_minutes(session['cardio']) if session.get('cardio') else 0
 cool=1 if session['expres'] else (3 if session['tipo']=='cardio' else 2)
 transition=2 if session.get('fuerza') and session.get('cardio') else 0
 return round(warm+strength+cardio+cool+transition,1)

def build_session(q,letter,index,kind,express=False):
 s={'letra':letter,'tipo':kind,'expres':express,'calentamiento':warmup(kind,express=express),'fuerza':[],'cardio':None,'vuelta_calma':'Recupera una respiración cómoda y camina suave si lo necesitas.','avisos':[]}
 if kind in ('fuerza','mixta'):
  items=strength_block(q,letter,index,kind)
  if express:
   # Priorizar 2-3 patrones, no copiar y recortar indiscriminadamente la sesión habitual.
   if kind=='mixta':items=items[:2]
   else:items=items[:3]
   for e in items:e['series']=3 if kind=='fuerza' else 2;e['descanso_orientativo_seg']=75 if e['patron']!='core' else 45
  s['fuerza']=items
  if q['lugar']=='casa' and not any(e['patron']=='traccion' for e in items):s['avisos'].append('No hay estímulo de tracción con carga equivalente sin equipamiento adecuado.')
  if any(e['ejercicio_id'] in ('remo_isometrico_autorresistencia','tiron_isometrico_toalla') for e in items):s['avisos'].append('La tracción por autorresistencia no equivale a un remo o jalón con carga externa.')
 if kind in ('cardio','mixta'):s['cardio']=cardio_block(q,letter,index,kind,express)
 # Validación y corrección interna: reducir accesorios si exceso, ampliar cardio si falta; preservar fuerza principal.
 for _ in range(8):
  t=duration(s)
  if express and t>23:
   if s['cardio'] and s['cardio']['formato']=='continuo' and s['cardio']['duracion_min']>5:s['cardio']['duracion_min']-=2;continue
   if s['cardio'] and s['cardio']['formato']!='continuo' and s['cardio']['repeticiones']>2:s['cardio']['repeticiones']-=1;continue
   if len(s['fuerza'])>2:s['fuerza'].pop();continue
  if not express and t>72:
   if s['cardio'] and s['cardio']['formato']=='continuo' and s['cardio']['duracion_min']>15:s['cardio']['duracion_min']-=5;continue
   if s['cardio'] and s['cardio']['formato']!='continuo' and s['cardio']['repeticiones']>3:s['cardio']['repeticiones']-=1;continue
   if len(s['fuerza'])>4:s['fuerza'].pop();continue
  if not express and t<48 and kind=='cardio' and s['cardio']:
   if s['cardio']['formato']=='continuo':s['cardio']['duracion_min']+=5;continue
   if s['cardio']['repeticiones']<12:s['cardio']['repeticiones']+=1;continue
  break
 s['duracion_estimada_min']=duration(s)
 if express and s['duracion_estimada_min']>24:s['avisos'].append('La duración exprés puede superar 20 minutos; ajustar descansos de forma individual sin sacrificar técnica.')
 if not express and s['duracion_estimada_min']<48:s['avisos'].append('Sesión más breve de 60 minutos: priorizamos una dosis viable, no añadimos trabajo de relleno.')
 if not express and s['duracion_estimada_min']>72:s['avisos'].append('La duración estimada supera la referencia; ajustar accesorios tras revisión profesional.')
 return s

def validate(plan):
 issues=[]
 if plan['estado']!='listo':return issues
 q=plan['cuestionario']
 for s in plan['sesiones']:
  if not s['fuerza'] and not s['cardio']:issues.append(f"{s['letra']}: sesión vacía")
  for x in s['fuerza']:
   if x['ejercicio_id'] not in INDEX or not available(INDEX[x['ejercicio_id']],q):issues.append(f"{s['letra']}: material incompatible {x['ejercicio_id']}")
   if x['series']<1 or x['series']>5:issues.append(f"{s['letra']}: series fuera de rango")
  if s['duracion_estimada_min']<=0:issues.append(f"{s['letra']}: duración inválida")
  if not s['expres'] and 'alternativa_expres' in s:
   x=s['alternativa_expres']
   if x['duracion_estimada_min']>25:issues.append(f"{s['letra']}: exprés demasiado larga")
  if s['cardio'] and s['cardio']['modalidad']=='bicicleta' and q['lugar']=='casa' and not q.get('bicicleta_confirmada'):issues.append('Bicicleta no confirmada')
 if q['dias']>=2 and sum(bool(s['fuerza']) for s in plan['sesiones'])<2:issues.append('Menos de 2 exposiciones de fuerza')
 return issues

def generate(answers):
 q=normalize(answers)
 if q['contraindicacion']!='no':return {'version':'3.0.0','estado':'requiere_valoracion','mensaje':'Antes de generar una prescripción automática, consulta con un profesional sanitario cualificado para valorar tu situación.','sesiones':[]}
 kinds=weekly_types(q['objetivo'],q['dias']);sessions=[]
 for i,k in enumerate(kinds):
  s=build_session(q,LETTERS[i],i,k)
  s['alternativa_expres']=build_session(q,LETTERS[i],i,k,True)
  sessions.append(s)
 plan={'version':'3.0.0','estado':'listo','cuestionario':q,'sesiones':sessions,'orientaciones':['Puedes distribuir las sesiones según tu semana; deja recuperación suficiente entre esfuerzos exigentes.','Los descansos son orientativos: prioriza calidad y técnica.','Cuando completes el extremo alto de repeticiones en todas las series con buena técnica y RPE adecuado, aumenta ligeramente la carga si puedes.','La sesión exprés ayuda a mantener continuidad, pero no equivale a todo el volumen de la sesión habitual.'],'avisos_globales':[]}
 if q['objetivo']=='hipertrofia' and q['lugar']=='casa' and not q['material']:plan['avisos_globales'].append('Sin cargas externas, el estímulo para hipertrofia puede ser insuficiente, especialmente en niveles altos y tracción.')
 problems=validate(plan)
 if problems:raise PlanError('Validación fallida: '+'; '.join(problems))
 return plan

if __name__=='__main__':
 import sys
 q=json.loads(sys.argv[1]) if len(sys.argv)>1 else {'objetivo':'general','dias':3,'nivel':'intermedio','lugar':'gimnasio','contraindicacion':'no','modalidad':'caminar'}
 print(json.dumps(generate(q),ensure_ascii=False,indent=2))
