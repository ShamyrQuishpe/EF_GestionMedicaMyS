import { useState } from "react"
import axios from 'axios'
import Mensaje from "./Alerts/Mensaje"
import { useNavigate } from "react-router-dom"

export const FormularioEspecialidades = ({especialidad}) => {

    const navigate = useNavigate()
    const [form, setform] = useState({
        codigo: especialidad?.codigo ??"",
        nombre: especialidad?.nombre ??"",
        descripcion: especialidad?.descripcion ??""
    })


    const [mensaje, setMensaje] = useState({})
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = async(e) => { 
        e.preventDefault()
        if (especialidad?._id) {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/${especialidad?._id}`
                const options = {
                    headers: {
                        method: 'PUT',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.put(url, form, options)
                setMensaje({respuesta:"especialidad actualizada con éxito",tipo:true})
                navigate('/especialidadeshboard')
            } catch (error) {
                console.log(error);
                setMensaje({respuesta:error.response.data.msg,tipo:false})
            }
        }else{
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/especialidades/registro`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.post(url,form,options)
                console.log(respuesta);
                setMensaje({respuesta:"especialidad registrado con éxito",tipo:true})
    
                setTimeout(()=>{
                    navigate('/especialidadeshboard')
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
                placeholder='codigo de la especialidad'
                name='codigo'
                value={form.codigo}
                onChange={handleChange}
            />
        </div>
        <div className="w-1/2 px-2">
            <label
                htmlFor='nombre'
                className='text-gray-700 uppercase font-bold text-xs'>
                nombre:
            </label>
            <input
                id='nombre'
                type='text'
                className='border-2 w-full p-1 mt-1 placeholder-gray-400 rounded-md mb-3'
                placeholder='nombre de la especialidad'
                name='nombre'
                value={form.nombre}
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
                placeholder='descripcion de la especialidad'
                name='descripcion'
                value={form.descripcion}
                onChange={handleChange}
            />
        </div>
    </div>
    <div className="px-1 mt-3">
        <input
            type='submit'
            className='bg-gray-600 w-1/2 p-2 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
            value={especialidad?._id ? 'Actualizar especialidad' : 'Registrar especialidad'}
        />
    </div>
</form>



    )
}