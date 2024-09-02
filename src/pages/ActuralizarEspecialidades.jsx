import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from "react"
import axios from 'axios'
import { FormularioEspecialidades } from '../components/FormularioEspecialidades'
import Mensaje from '../components/Alerts/Mensaje'

const ActualizarEspecialidades = () => {
    const {id} = useParams()

    const [especialidad, setEspecialidad] = useState({})

    const [mensaje, setMensaje] = useState({})
    
    useEffect(() => {
      const consultarEspecialidad = async () => { 
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta);

            setEspecialidad(respuesta.data)
        } catch (error) {
            console.log(error);
        }
       }
       consultarEspecialidad()
    }, [])
    
    
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Datos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de una especialidad</p>
            {
                Object.keys(especialidad).length != 0 ?
                    (
                        <FormularioEspecialidades    especialidad={especialidad}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>
    )
}

export default ActualizarEspecialidades