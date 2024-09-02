import React, {useContext} from 'react';
import { Link, Navigate, Outlet, useLocation} from 'react-router-dom'
import LogoPrincipal from '../../public/logoPrincipal.png'
import Citas from '../../public/citas.png'
import Especialidades from '../../public/especialidades.png'
import Pacientes from '../../public/pacientes.png'
import AuthContext from '../context/AuthProvider'


const Dashboard =() => {
  const location = useLocation()
  const {auth}=useContext(AuthContext)
  const autenticado=localStorage.getItem('token')
  return (

    <div className="flex h-screen bg-blue-400">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-900 text-white flex flex-col items-center">
        <div className="my-8">
          <h1 className="text-xl font-bold text-white">APP - CITAS MÉDICAS</h1>
        </div>

        <div className="mb-8 flex flex-col items-center" >
          <img src={LogoPrincipal} alt="Logo" className="w-24 h-24" />
          <h2 className="text-center text-lg">BIENVENIDO - {auth?.nombre}</h2>
          <hr className="border-white w-0.1 mt-2" />
        </div>
        
      </div>

      {/* Main Content */}
      <div className="flex-1 ">
        <div className="flex justify-end bg-blue-900 p-8" >
          <div className="flex items-center">
            <span className="text-white mr-4">BIENVENIDO - {auth?.nombre}</span>
            <Link to='/' className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={()=>{localStorage.removeItem('token')}}>Salir</Link>
          </div>
          </div>
            <div className="mt-16 pl-32">
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-1">
              <div className="flex flex-col items-center bg-gray-200 p-14 rounded-lg text-center shadow-sm max-w-sm">
                <img src={Pacientes} alt="Pacientes" className="w-16 h-16 mx-auto mb-4" />
                <Link to='/pacientesdashboard'className="w-full py-3 text-center hover:bg-blue-400">PACIENTES</Link>
              </div>
              <div className="flex flex-col items-center bg-gray-200 p-14 rounded-lg text-center shadow-sm max-w-sm">
                <img src={Especialidades} alt="Especialidades" className="w-16 h-16 mx-auto mb-4" />
                <Link to='/especialidadeshboard' className="w-full py-3 text-center hover:bg-blue-400">ESPECIALIDADES</Link>
              </div>
            </div>
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4  pl-72">
                  <div className="flex flex-col items-center bg-gray-200 p-14 rounded-lg text-center shadow-sm max-w-sm">
                    <img src={Citas} alt="Citas" className="w-16 h-16 mx-auto mb-4" />
                    <Link to='/citashboard' className="w-full py-3 text-center hover:bg-blue-400">CITAS</Link>
                  </div>
            </div>
        </div>
        <div className='overflow-y-scroll p-8'>
          {autenticado ? <Outlet /> : <Navigate to = "/"/>}
        </div>
        <div className="fixed bottom-0 w-full">
            <div className='bg-blue-900 h-12'>
                <p className='text-center text-slate-100 leading-[2.9rem] underline'>
                    Todos los derechos reservados
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
