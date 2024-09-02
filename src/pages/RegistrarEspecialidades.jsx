import React from 'react'
import { FormularioEspecialidades } from '../components/FormularioEspecialidades'

const RegistrarEspecialidades = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registro de Especialidades</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar una nueva especiaidad</p>
            <FormularioEspecialidades/>
        </div>
    )
}

export default RegistrarEspecialidades