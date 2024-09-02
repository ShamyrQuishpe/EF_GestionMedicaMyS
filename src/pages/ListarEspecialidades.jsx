import React from 'react'
import TablaEspecialidades from '../components/TablaEspecialidades'
import { listarEspecialidades } from '../../../Backend/EF_GestionMedicaMyS/src/controllers/especialidad_controller'

const ListarEspecialidades = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'> Especialidades Registradas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite visulizar todas las especialidades que se encuentran registradas. Además, eliminar, ver el detalle y actualizar.</p>
            <TablaEspecialidades/>
        </div>
    )
}

export default ListarEspecialidades