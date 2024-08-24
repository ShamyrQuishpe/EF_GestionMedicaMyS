import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

usuarioSchema.methods.encrypPassword = async function (password) {
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp    
}

usuarioSchema.methods.encryptPassword = async function (password) {
    const response = await bcrypt.compare(password,this.password)
    return response
}

usuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}

export default Schema('usuarios', usuarioSchema)

