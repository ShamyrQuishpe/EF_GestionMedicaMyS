import { useState } from "react"
import axios from 'axios'
import Mensaje from "./Alerts/Mensaje"
import { useNavigate } from "react-router-dom"

export const Formulario = ({paciente}) => {

    const navigate = useNavigate()
    const [form, setform] = useState({
        nombre: paciente?.nombre ??"",
        apellido: paciente?.apellido ??"",
        cedula: paciente?.cedula ??"",
        fecha_nacimiento: paciente?.fecha_nacimiento ??"",
        genero: paciente?.genero ??"",
        ciudad: paciente?.ciudad ??"",
        direccion: paciente?.direccion ??"",
        telefono: paciente?.telefono ??"",
        email: paciente?.email ??""
    })


    const [mensaje, setMensaje] = useState({})
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e) => { 
        e.preventDefault()
        if (paciente?._id) {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/${paciente?._id}`
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.put(url, form, options)
                setMensaje({respuesta:"Paciente actualizado con éxito",tipo:true})
                navigate('/pacientesdashboard')
            } catch (error) {
                console.log(error);
                setMensaje({respuesta:error.response.data.msg,tipo:false})
            }
        }else{
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/registro`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.post(url,form,options)
                console.log(respuesta);
                setMensaje({respuesta:"Paciente registrado con éxito",tipo:true})
    
                setTimeout(()=>{
                    navigate('/pacientesdashboard')
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
    <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
            <label
                htmlFor='nombre'
                className='text-gray-700 uppercase font-bold text-xs'>
                Nombre:
            </label>
            <input
                id='nombre'
                type='text'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='nombre del paciente'
                name='nombre'
                value={form.nombre}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='apellido'
                className='text-gray-700 uppercase font-bold text-xs'>
                Apellido:
            </label>
            <input
                id='apellido'
                type='text'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='apellido del paciente'
                name='apellido'
                value={form.apellido}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='cedula'
                className='text-gray-700 uppercase font-bold text-xs'>
                Cédula:
            </label>
            <input
                id='cedula'
                type='number'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='cédula del paciente'
                name='cedula'
                value={form.cedula}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='fecha_nacimiento'
                className='text-gray-700 uppercase font-bold text-xs'>
                Fecha de nacimiento:
            </label>
            <input
                id='fecha_nacimiento'
                type='date'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                name='fecha_nacimiento'
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='genero'
                className='text-gray-700 uppercase font-bold text-xs'>
                Género:
            </label>
            <select
                id='genero'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                name='genero'
                value={form.genero}
                onChange={handleChange}
            >
                <option value='' disabled>
                    Seleccione el género
                </option>
                <option value='masculino'>Masculino</option>
                <option value='femenino'>Femenino</option>
            </select>
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='ciudad'
                className='text-gray-700 uppercase font-bold text-xs'>
                Ciudad:
            </label>
            <input
                id='ciudad'
                type='text'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='ciudad del paciente'
                name='ciudad'
                value={form.ciudad}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='direccion'
                className='text-gray-700 uppercase font-bold text-xs'>
                Dirección:
            </label>
            <input
                id='direccion'
                type='text'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='dirección del paciente'
                name='direccion'
                value={form.direccion}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='telefono'
                className='text-gray-700 uppercase font-bold text-xs'>
                Teléfono:
            </label>
            <input
                id='telefono'
                type='number'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='Teléfono del paciente'
                name='telefono'
                value={form.telefono}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='email'
                className='text-gray-700 uppercase font-bold text-xs'>
                Email:
            </label>
            <input
                id='email'
                type='email'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='email del paciente'
                name='email'
                value={form.email}
                onChange={handleChange}
            />
        </div>
    </div>

    <div className="px-2 mt-3">
        <input
            type='submit'
            className='bg-gray-600 w-full p-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
            value={paciente?._id ? 'Actualizar paciente' : 'Registrar paciente'}
        />
    </div>
</form>



    )
}