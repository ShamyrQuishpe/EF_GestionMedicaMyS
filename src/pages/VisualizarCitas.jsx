import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../components/Alerts/Mensaje';
//import ModalTratamiento from '../componets/Modals/ModalTratamiento';
//import TratamientosContext from '../context/TratamientoProvider';
//import TablaTratamientos from '../componets/TablaTratamientos';
import AuthContext from '../context/AuthProvider';


const VisualizarCitas = () => {
   // const { auth } = useContext(AuthContext)
    //const {modal,mensaje,handleModal,tratamientos,setTratamientos} = useContext(TratamientosContext)
    const [mensaje, setMensaje] = useState({})
    //PASO 1
    const {id} = useParams()
    const [cita, setCita] = useState({})
    const [paciente, setPaciente] = useState({});
    const [especialidad, setEspecialidad] = useState({});



    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
			nuevaFecha.setMinutes(nuevaFecha.getMinutes() + nuevaFecha.getTimezoneOffset())
        return new Intl.DateTimeFormat('es-EC',{dateStyle:'long'}).format(nuevaFecha)
    }


    //PASO 2
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
                const respuestaCita = await axios.get(url, options)
                setCita(respuestaCita.data)

                // Consultar los detalles del paciente
                const urlPaciente = `${import.meta.env.VITE_BACKEND_URL}/pacientes/${respuestaCita.data.id_paciente}`;
                const respuestaPaciente = await axios.get(urlPaciente, options);
                setPaciente(respuestaPaciente.data);
        
                // Consultar los detalles de la especialidad
                const urlEspecialidad = `${import.meta.env.VITE_BACKEND_URL}/especialidades/${respuestaCita.data.id_especialidad}`;
                const respuestaEspecialidad = await axios.get(urlEspecialidad, options);
                setEspecialidad(respuestaEspecialidad.data);

            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarCita()
    }, [])


    //PASO 3
    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Detalle Cita</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este submódulo te permite visualizar los datos de la cita</p>
            </div>
            <div>
                {
                    Object.keys(cita).length != 0 ?
                        (
                            <>
                            <div className='m-5 flex justify-between'>
                                <div>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Código: </span>
                                        {cita.codigo}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Descripción: </span>
                                        {cita.descripcion}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Paciente: </span>
                                        {paciente.nombre} {paciente.apellido}
                                    </p>
                                    <p className="text-md text-gray-00 mt-4">
                                        <span className="text-gray-600 uppercase font-bold">* Especialidad: </span>
                                        {especialidad.nombre}
                                    </p>
                                </div>
                                <div>
                                    <img src='../../public/historia.png' alt="dogandcat" className='h-40 w-40' />
                                </div>
                            </div>
                            <hr className='my-4' />
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

export default VisualizarCitas