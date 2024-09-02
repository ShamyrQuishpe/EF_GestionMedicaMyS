import React from 'react'
import { FormularioCitas } from '../components/FormularioCitas'

const RegistrarCitas = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registro de Citas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar una nueva cita</p>
            <FormularioCitas/>
        </div>
    )
}

export default RegistrarCitas