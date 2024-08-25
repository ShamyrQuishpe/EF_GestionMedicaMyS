import { enviarCorreo } from "../config/nodemailer.js"
import usuarios from "../models/usuarios_model.js"
import generarJWT from "../helpers/JWT.js"
import mongoose from "mongoose"


const confirmarEmail = async(req, res)=>{    
    if(!(req.params.token)) return res.status(400).json({
        msg:"Lo sentimos no hemos podido verificar su cuenta"})
    const usuario = await usuarios.findOne({token: req.params.token})
    if(!usuario?.token) return res.status(404).json({
        msg: "La cuenta ya ha sido verificada"
    })
    usuario.token = null
    usuario.confirmEmail = true
    await usuario.save()
    res.status(200).json({msg: "Token confirmado, ya puedes iniciar sesión"})
}

const loginUsuario = async(req, res)=>{
    const {email, password} = req.body
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const usuarioInformacion = await usuarios.findOne({email})//.select("-estado -createdAt -updatedAt -__v -token")
    if(!usuarioInformacion) return res.status(404).json({
        msg: "Lo siento el usuario no se encuentra registrado"
    })
    if(usuarioInformacion?.confirmEmail === false) return res.status(403).json({
        msg: "Lo siento debe primero verificar su cuenta"
    })
    const confirmarPasword = await usuarioInformacion.matchPassword(password)
    if(!confirmarPasword) return res.status(404).json({
        msg: "Lo sentimos la contraseña es incorrecta"
    })
    const token = generarJWT(usuarioInformacion._id, "usuario")
    const {nombre, apellido, telefono, _id} = usuarioInformacion
    res.status(200).json({
        nombre, 
        apellido, 
        telefono, 
        token, 
        _id, 
        email: usuarioInformacion.email})
}

const registrarUsuario = async(req, res)=>{
    const {email, password} = req.body
    console.log("hola")
    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos debe llenar todos los campos"
    })
    const emailEncontrado = await usuarios.findOne({email})
    if(emailEncontrado) return res.status(400).json({
        msg: "Lo sentimos este email, ya se encuentra registrado"
    }) 

    const nuevoUsuario =  new usuarios(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)

    const token =  nuevoUsuario.createToken()
    await enviarCorreo(email, token)
    await nuevoUsuario.save()
    res.status(200).json({msg: "Revisa tu correo para verificar tu cuenta"})
}

export {
    confirmarEmail,
    loginUsuario,
    registrarUsuario
}