import axios from "axios";
import { useContext,useEffect, useState } from "react";
import { MdDeleteForever,MdNoteAdd,MdInfo } from "react-icons/md";
import Mensaje from "./Alerts/Mensaje"
import {useNavigate} from 'react-router-dom'
import AuthContext from "../context/AuthProvider"

const TablaCitas = () => {

    const { auth } = useContext(AuthContext)
    const navigate =useNavigate()

    const [citas,setCitas]= useState([])

    const listarcitas = async () => { 
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/citas/listar`
            const options={
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url,options)
            
            
            setCitas(respuesta.data,...citas)

        } catch (error) {
            console.log(error);
            
        }
     }
     const handleDelete=async (id)=>{
        try {
            const confirmar = confirm("¿Estas seguro de eliminar la cita?")
            if(confirmar){
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/citas/${id}`
                const headers = {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
                const data = {
                    salida:new Date().toString()
                }
                await axios.delete(url,{headers, data});
                listarcitas()
            }
        } catch (error) {
            console.log(error);
        }
     }

     useEffect(() => {
        listarcitas()
    }, [])
     
    return (
        <>
            {
                citas.length == 0
                    ?
                    <Mensaje tipo={'active'}>{'No existen registros'}</Mensaje>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Código</th>
                                <th className="p-2">Descripción</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                citas.map((cita, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={cita._id}>
                                        <td>{index + 1}</td>
                                        <td>{cita.codigo}</td>
                                        <td>{cita.descripcion}</td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={()=>{navigate(`/citashboard/visualizar/${cita._id}`)}}/>
                                                        <>
                                                            <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" 
                                                            onClick={() => navigate(`/citashboard/actualizar/${cita._id}`)} 
                                                        />
                                                
                                                            <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block" 
                                                            onClick={() => { handleDelete(cita._id) }}
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

export default TablaCitas