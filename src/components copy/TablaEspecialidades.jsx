import axios from "axios";
import { useContext,useEffect, useState } from "react";
import { MdDeleteForever,MdNoteAdd,MdInfo } from "react-icons/md";
import Mensaje from "./Alerts/Mensaje"
import {useNavigate} from 'react-router-dom'
import AuthContext from "../context/AuthProvider"

const TablaEspecialidades = () => {

    const { auth } = useContext(AuthContext)
    const navigate =useNavigate()

    const [especialidades,setEspecialidades]= useState([])

    const listarespecialidades = async () => { 
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/listar`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url,options)
            
            
            setEspecialidades(respuesta.data,...especialidades)

        } catch (error) {
            console.log(error);
            
        }
     }
     const handleDelete=async (id)=>{
        try {
            const confirmar = confirm("¿Estas seguro de eliminar la especialidad?")
            if(confirmar){
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/${id}`
                const headers = {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
                const data = {
                    salida:new Date().toString()
                }
                await axios.delete(url,{headers, data});
                listarespecialidades()
            }
        } catch (error) {
            console.log(error);
        }
     }

     useEffect(() => {
        listarespecialidades()
    }, [])
     
    return (
        <>
            {
                especialidades.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Código</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                especialidades.map((especialidad, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={especialidad._id}>
                                        <td>{index + 1}</td>
                                        <td>{especialidad.codigo}</td>
                                        <td>{especialidad.nombre}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={()=>{navigate(`/especialidadeshboard/visualizar/${especialidad._id}`)}}/>
                                                        <>
                                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                                            onClick={() => navigate(`/especialidadeshboard/actualizar/${especialidad._id}`)} 
                                                        />
                                                
                                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" 
                                                            onClick={() => { handleDelete(especialidad._id) }}
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

export default TablaEspecialidades