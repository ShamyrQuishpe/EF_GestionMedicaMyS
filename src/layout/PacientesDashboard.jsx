import React, {useContext} from 'react'
import { Link, Navigate, Outlet, useLocation} from 'react-router-dom'
import Pacientes from '../../public/pacientes.png'
import AuthContext from '../context/AuthProvider'

const PacientesDashboard=()=> {

    const {auth}=useContext(AuthContext)
    const urlActual = location.pathname
    const autenticado=localStorage.getItem('token')

  return (
    <div className="flex h-screen bg-blue-400">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-900 text-white flex flex-col items-center">
        <div className="my-8">
          <h1 className="text-xl font-bold text-white">APP - CITAS MÉDICAS</h1>
        </div>

        <div className="mb-8 flex flex-col items-center" >
          <img src={Pacientes} alt="Logo" className="w-24 h-24" />
          <h2 className="text-center text-lg">MÓDULO - PACIENTES</h2>
          <hr className="border-white w-0.1 mt-2" />
          <ul className="mt-5">
                    <li className="text-center">
                        <Link to='/pacientesdashboard' className={`${urlActual === '/pacientesdashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-100'} text-xl block mt-2 hover:text-slate-600`}>Listar</Link>
                    </li>
                    <li className="text-center">
                        <Link to='/pacientesdashboard/registrar' className={`${urlActual === '/pacientesdashboard/registrar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-100'} text-xl block mt-2 hover:text-slate-600`}>Registrar</Link>
                    </li>
          </ul>
          <Link to='/dashboard' className=" mt-96 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-700">Página Principal</Link>
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
  )
}

export default PacientesDashboard
