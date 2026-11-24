import { BrowserRouter, Link, Route, Routes, Navigate,   Outlet,
  useLocation } from 'react-router-dom'
 import {Header} from './components/Header'
 import React from 'react'
/* import Footer from './components/Footer'
import { Button } from './components/ui/button' */
/* import CustomerDashboardPage from './EnterprisePrivateZone/Main'
 */import EnterpriseLogin from './EnterprisePrivateZone/Login'

import Home from './PublicZone/Home'
import MeetUs from './PublicZone/MeetUs'
import Servicios from './PublicZone/EnterpriseServices';
import ComoTrabajamos from "./PublicZone/Comotrabajamos";
import {
  AvisoLegal,
  PoliticaPrivacidad,
  CondicionesServicio,
} from "./PublicZone/LegalPages";
import { isFeatureFlagAllowed } from './utils/featureflag'
import AlimentacionDashboard from './EnterprisePrivateZone/Alimentacion'
import Movimiento from './EnterprisePrivateZone/Movimiento'
import { Fuerza } from './EnterprisePrivateZone/Fuerza'
import { Calma } from './EnterprisePrivateZone/Calma'
import { Habitos } from './EnterprisePrivateZone/Habitos'
import AreasPage from './EnterprisePrivateZone/Dashboard'
import TrainingBuilder from './EnterprisePrivateZone/TrainingBuilder'
import PausaLayout from './EnterprisePrivateZone/PausaLayout'
import Deka from './EnterprisePrivateZone/Deka'


 
function Placeholder({ title }) {
  return <> <Header/> <main className="flex min-h-[75vh] items-center justify-center px-6 pt-24"><div className="max-w-xl text-center"><p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-green">Pawsitive Sanctuary</p><h1 className="font-display text-4xl font-extrabold text-ink">{title}</h1><p className="mt-4 leading-7 text-muted">Esta sección la desarrollaremos en la siguiente fase del proyecto.</p></div></main>{/* <Footer/> */}</>
}

function isAuthenticated() {
  return Boolean(localStorage.getItem("pausa_token"));
}

function ProtectedRoute() {
  const location = useLocation();
/* TODO: eliminar false */
  if (!isAuthenticated() || isFeatureFlagAllowed() && false) {
    return (
      <Navigate
        to="/login-clientes"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home/>}/>
   <Route path="/quienes-somos" element={<MeetUs />} />
<Route path="/servicios" element={<Servicios />} />
<Route
  path="/como-trabajamos"
  element={<ComoTrabajamos />}
/>
{/* legales */}
<Route path="/aviso-legal" element={<AvisoLegal />} />

<Route
  path="/politica-de-privacidad"
  element={<PoliticaPrivacidad />}
/>

<Route
  path="/condiciones-del-servicio"
  element={<CondicionesServicio />}
/>


{/* Clientes */}
 <Route path="/login-clientes" element={<EnterpriseLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<PausaLayout />}>
            <Route path="/dashboard" element={<AreasPage />} />
            <Route path="/movimiento" element={<Movimiento />} />
            <Route path="/fuerza" element={<Fuerza />} />
            <Route path="/alimentacion" element={<AlimentacionDashboard />} />
            <Route path="/calma" element={<Calma />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/deka" element={<Deka />} />
            <Route path="/entrenamiento-personalizado" element={<TrainingBuilder />} />
          </Route>
        </Route>


    <Route path="*" element={<Placeholder title="Página no encontrada"/>}/>


  </Routes></BrowserRouter>
}
