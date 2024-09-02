import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from "react"
import axios from 'axios'
import { Formulario } from '../components/Formulario'
import Mensaje from '../components/Alerts/Mensaje'

const Actualizar = () => {
    const {id} = useParams()

    const [paciente, setPaciente] = useState({})

    const [mensaje, setMensaje] = useState({})
    
    useEffect(() => {
      const consultarPaciente = async () => { 
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta);

            setPaciente(respuesta.data)
        } catch (error) {
            console.log(error);
        }
       }
       consultarPaciente()
    }, [])
    
    
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Datos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un paciente</p>
            {
                Object.keys(paciente).length != 0 ?
                    (
                        <Formulario paciente={paciente}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>
    )
}

export default Actualizar