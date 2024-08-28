import mongoose, {Schema, model} from 'mongoose'

const citaSchema = new Schema({
    codigo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    id_paciente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pacientes_model'
    },
    id_especialidad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'especialidad_model'
    }

})

export default mongoose.model('citas', citaSchema)