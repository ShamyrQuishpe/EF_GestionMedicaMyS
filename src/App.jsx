import {Login} from './pages/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './layout/Dashboard'
import PacientesDashboard from './layout/PacientesDashboard'
import { AuthProvider } from './context/AuthProvider'
import CrearPacientes from './pages/CrearPacientes'
import Listar from './pages/Listar'
import Visualizar from './pages/Visualizar'
import Actualizar from './pages/Acturalizar'
import EspecialidadesDashboard from './layout/EspecialidadesDashboard'
import RegistrarEspecialidades from './pages/RegistrarEspecialidades'
import ListarEspecialidades from './pages/ListarEspecialidades'
import VisualizarEspecialidades from './pages/VisualizarEspecialidades'
import ActualizarEspecialidades from './pages/ActuralizarEspecialidades'
import CitasDashboard from './layout/CitasDashboard'
import RegistrarCitas from './pages/RegistrarCitas'
import ListarCitas from './pages/ListarCitas'
import VisualizarCitas from './pages/VisualizarCitas'
import ActualizarCitas from './pages/ActuralizarCitas'
function App(){

  return (
    <>
    <BrowserRouter>
    <AuthProvider>
    <Routes>

      <Route index element={<Login/>}/>

      <Route path='dashboard/*' element={
        <Routes>
          <Route index element={<Dashboard/>}></Route>
        </Routes>
      }/>

      <Route path='pacientesdashboard/*' element={
        <Routes>
          <Route element={<PacientesDashboard/>}>
          <Route index element={<Listar/>}/>
          <Route path='registrar' element={<CrearPacientes/>}/>
          <Route path='visualizar/:id' element={<Visualizar/>}/>
          <Route path='actualizar/:id' element={<Actualizar/>}/>
          </Route>
        </Routes>
      }/>

      <Route path='especialidadeshboard/*' element={
        <Routes>
          <Route element={<EspecialidadesDashboard/>}>
          <Route index element={<ListarEspecialidades/>}/>
          <Route path='registrar' element={<RegistrarEspecialidades/>}/>
          <Route path='visualizar/:id' element={<VisualizarEspecialidades/>}/>
          <Route path='actualizar/:id' element={<ActualizarEspecialidades/>}/>
          </Route>
        </Routes>
      }/>

      <Route path='citashboard/*' element={
        <Routes>
          <Route element={<CitasDashboard/>}>
          <Route index element={<ListarCitas/>}/>
          <Route path='registrar' element={<RegistrarCitas/>}/>
          <Route path='visualizar/:id' element={<VisualizarCitas/>}/>
          <Route path='actualizar/:id' element={<ActualizarCitas/>}/>
          </Route>
        </Routes>
      }/>



    </Routes>
    </AuthProvider>
    
    </BrowserRouter>
    
    </>
  )

}

export default App