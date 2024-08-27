import {Schema, model} from 'mongoose'

const especialidadSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    }
})

export default model('especialidades', especialidadSchema)