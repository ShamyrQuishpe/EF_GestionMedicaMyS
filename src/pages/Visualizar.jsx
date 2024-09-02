import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alerts/Mensaje';
//import ModalTratamiento from '../componets/Modals/ModalTratamiento';
//import TratamientosContext from '../context/TratamientoProvider';
//import TablaTratamientos from '../componets/TablaTratamientos';
import AuthContext from '../context/AuthProvider';


const Visualizar = () => {
   // const { auth } = useContext(AuthContext)
    //const {modal,mensaje,handleModal,tratamientos,setTratamientos} = useContext(TratamientosContext)
    const [mensaje, setMensaje] = useState({})
    //PASO 1
    const {id} = useParams()
    const [paciente, setPaciente] = useState({})

    console.log("Paciente encontrado: ",paciente)


    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
			nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-EC',{dateStyle:'long'}).format(nuevaFecha)
    }


    //PASO 2
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
                console.log("respuesta",respuesta)
                setPaciente(respuesta.data)
                //setTratamientos(respuesta.data.tratamientos)
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarPaciente()
    }, [])


    //PASO 3
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Detalle Paciente</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos del paciente</p>
            </div>
            <div>
                {
                    Object.keys(paciente).length != 0 ?
                        (
                            <>
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Nombre: </span>
                                        {paciente.nombre}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Apellido: </span>
                                        {paciente.apellido}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Cédula: </span>
                                        {paciente.cedula}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Fecha de nacimiento: </span>
                                        {formatearFecha(paciente.fecha_nacimiento)}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Género: </span>
                                        {paciente.genero}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Ciudad: </span>
                                        {paciente.ciudad}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Dirección: </span>
                                        {paciente.direccion}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Teléfono: </span>
                                        {paciente.telefono}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Email: </span>
                                        {paciente.email}
                                    </p>
                                </div>
                                <div>
                                    <img src='../../public/pacientes2.png' alt="dogandcat" className='h-40 w-40' />
                                </div>
                            </div>
                            <hr className='my-4' />
                            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
                            <p className='mb-8'>Este submódulo te permite visualizar las citas del paciente</p>
                            </>
                        )
                        :
                        (
                            Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                        )
                }
            </div>
        </>

    )
}

export default Visualizar