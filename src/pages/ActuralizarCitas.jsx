import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect,useState } from "react"
import axios from 'axios'
import { FormularioCitas } from '../components/FormularioCitas'
import Mensaje from '../components/Alerts/Mensaje'

const ActualizarCitas = () => {
    const {id} = useParams()

    const [cita, setCita] = useState({})

    const [mensaje, setMensaje] = useState({})
    
    useEffect(() => {
      const consultarCita = async () => { 
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/citas/${id}`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta);

            setCita(respuesta.data)
        } catch (error) {
            console.log(error);
        }
       }
       consultarCita()
    }, [])
    
    
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Datos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de una cita</p>
            {
                Object.keys(cita).length != 0 ?
                    (
                        <FormularioCitas   cita={cita}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>
    )
}

export default ActualizarCitas