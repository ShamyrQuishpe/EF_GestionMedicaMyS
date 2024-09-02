import { useEffect, useState } from "react"
import axios from 'axios'
import Mensaje from "./Alerts/Mensaje"
import { useNavigate } from "react-router-dom"
import { listarEspecialidades } from "../../../Backend/EF_GestionMedicaMyS/src/controllers/especialidad_controller"

export const FormularioCitas = ({cita}) => {

    const navigate = useNavigate()
    const [form, setform] = useState({
        codigo: cita?.codigo ??"",
        descripcion: cita?.descripcion ??"",
        id_paciente: cita?.id ??"",
        id_especialidad: cita?.id ??""
    })


    const [mensaje, setMensaje] = useState({})
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const [pacientes,setPacientes]= useState([])

    useEffect(() => {
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
         listarPacientes()
    } ,[])
    

     const [especialidades,setEspecialidades]= useState([])
    
    useEffect(()=>{
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
        listarespecialidades()
    },[])
    

    const handleSubmit = async(e) => { 
        e.preventDefault()
        if (cita?._id) {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/citas/${cita?._id}`
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.put(url, form, options)
                setMensaje({respuesta:"Cita actualizada con éxito",tipo:true})
                navigate('/citashboard')
            } catch (error) {
                console.log(error);
                setMensaje({respuesta:error.response.data.msg,tipo:false})
            }
        }else{
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/citas/registrar`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.post(url,form,options)
                console.log(respuesta);
                setMensaje({respuesta:"Cita registrada con éxito",tipo:true})
    
                setTimeout(()=>{
                    navigate('/citashboard')
                }, 3000);
            } catch (error) {
                    console.log(error);
                    setMensaje({respuesta:error.response.data.msg,tipo:false})
            }
        }
    }

    


    return (
        
        <form onSubmit={handleSubmit}>
    {Object.keys(mensaje).length > 0 && (
        <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
    )}
    <div className=" flex-wrap -mx-2">
        <div className="w-1/2 px-2">
            <label
                htmlFor='codigo'
                className='text-gray-700 uppercase font-bold text-xs'>
                Código:
            </label>
            <input
                id='codigo'
                type='text'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='codigo de la cita'
                name='codigo'
                value={form.codigo}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='descripcion'
                className='text-gray-700 uppercase font-bold text-xs'>
                Descripción:
            </label>
            <input
                id='descripcion'
                type='text-area'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='descripcion de la cita'
                name='descripcion'
                value={form.descripcion}
                onChange={handleChange}
            />
        </div>
    </div>
    <div className="w-1/2 px-2">
                <label
                    htmlFor='id_paciente'
                    className='text-gray-700 uppercase font-bold text-xs'>
                    Paciente:
                </label>
                <select
                    id='id_paciente'
                    className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                    name='id_paciente'
                    value={form.id_paciente}
                    onChange={handleChange}
                >
                    <option value="">Seleccione un paciente</option>
                    {pacientes.map((paciente) => (
                        <option key={paciente._id} value={paciente._id}>
                            {paciente.nombre} {paciente.apellido}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-1/2 px-2">
                <label
                    htmlFor='id_especialidad'
                    className='text-gray-700 uppercase font-bold text-xs'>
                    Especialidad:
                </label>
                <select
                    id='id_especialidad'
                    className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                    name='id_especialidad'
                    value={form.id_especialidad}
                    onChange={handleChange}
                >
                    <option value="">Seleccione una especialidad</option>
                    {especialidades.map((especialidad) => (
                        <option key={especialidad._id} value={especialidad._id}>
                            {especialidad.nombre}
                        </option>
                    ))}
                </select>
            </div>
    <div className="px-1 mt-3">
        <input
            type='submit'
            className='bg-gray-600 w-1/2 p-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
            value={cita?._id ? 'Actualizar cita' : 'Registrar cita'}
        />
    </div>
</form>



    )
}