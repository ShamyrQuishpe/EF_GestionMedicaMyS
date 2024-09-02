import axios from 'axios'
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Mensaje from '../components/Alerts/Mensaje'


export const  Login = () => {

    const navigate = useNavigate()
    const [mensaje, setMensaje] = useState({})
    const [errors, setErrors] = useState({});

    const [form, setform] = useState({
      email: "",
      password: ""
  })
  
    const handleChange = (e) => {
      setform({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
  
    const validateForm = () => {
      const newErrors = {};
  
      // Validación de email
      if (!form.email) {
        newErrors.email = 'El email es obligatorio';
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        newErrors.email = 'El email no es válido';
      }
  
      // Validación de la contraseña
      if (!form.password) {
        newErrors.password = 'La clave es obligatoria';
      } else if (form.password.length < 8) {
        newErrors.password = 'La clave debe tener al menos 8 caracteres';
      }
  
      return newErrors;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const validationErrors = validateForm();
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({});
        console.log('Formulario enviado', form);
      }
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/usuarios/login`
        const respuesta= await axios.post(url,form)
        localStorage.setItem('token',respuesta.data.token)
        //setAuth(respuesta.data)
        navigate('/dashboard')
      } catch (error) {
          setMensaje({respuesta:error.response.data.msg,tipo:false})
          setform({})
          setTimeout(() => {
              setMensaje({})
          }, 3000);
      }
    };
  
    return (
      <div className="flex h-screen bg-blue-900 justify-center items-center">
        <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">BIENVENIDO</h1>
          <p className="text-center mb-8">Ingresa tus datos para iniciar sesión</p>

          {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Ingresa tu correo"
                value={form.email || ""} onChange={handleChange}
                className={`block w-full p-2 rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Clave:</label>
              <input
                type="password"
                name="password"
                placeholder="********************"
                value={form.password ||""} onChange={handleChange}
                className={`block w-full p-2 rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring-blue-500`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
  )
}

