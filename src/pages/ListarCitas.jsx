import React from 'react'
import TablaCitas from '../components/TablaCitas'

const ListarCitas = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'> Citas Registradas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite visulizar todas las citas que se encuentran registradas. Además, eliminar, ver el detalle y actualizar.</p>
            <TablaCitas/>
        </div>
    )
}

export default ListarCitas