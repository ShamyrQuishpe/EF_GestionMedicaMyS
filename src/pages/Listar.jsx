import React from 'react'
import Tabla from '../components/Tabla'

const Listar = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'> Pacientes Registrados</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite visulizar todos los pacientes que se encuentran registrados. Además, eliminar pacientes, ver el detalle y actualizar sus datos.</p>
            <Tabla/>
        </div>
    )
}

export default Listar