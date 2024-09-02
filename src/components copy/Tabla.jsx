import axios from "axios";
import { useContext,useEffect, useState } from "react";
import { MdDeleteForever,MdNoteAdd,MdInfo } from "react-icons/md";
import Mensaje from "./Alerts/Mensaje"
import {useNavigate} from 'react-router-dom'
import AuthContext from "../context/AuthProvider"

const Tabla = () => {

    const { auth } = useContext(AuthContext)
    const navigate =useNavigate()

    const [pacientes,setPacientes]= useState([])

    const listarPacientes = async () => { 
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/listar`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url,options)
            
            
            setPacientes(respuesta.data,...pacientes)

        } catch (error) {
            console.log(error);
            
        }
     }
     const handleDelete=async (id)=>{
        try {
            const confirmar = confirm("¿Estas seguro de registrar la salida del paciente?")
            if(confirmar){
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/${id}`
                const headers = {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
                const data = {
                    salida:new Date().toString()
                }
                await axios.delete(url,{headers, data});
                listarPacientes()
            }
        } catch (error) {
            console.log(error);
        }
     }

     useEffect(() => {
        listarPacientes()
    }, [])
     
    return (
        <>
            {
                pacientes.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Cedula</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Teléfono</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pacientes.map((paciente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={paciente._id}>
                                        <td>{index + 1}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.apellido}</td>
                                        <td>{paciente.cedula}</td>
                                        <td>{paciente.email}</td>
                                        <td>{paciente.telefono}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={()=>{navigate(`/pacientesdashboard/visualizar/${paciente._id}`)}}/>
                                                        <>
                                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                                            onClick={() => navigate(`/pacientesdashboard/actualizar/${paciente._id}`)} 
                                                        />
                                                
                                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" 
                                                            onClick={() => { handleDelete(paciente._id) }}
                                                        />
                                                    </>                                                                                            
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>

    )
}

export default Tabla