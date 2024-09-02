import usuarios from "../models/usuarios_model.js"
import generarJWT from "../helpers/JWT.js"
import mongoose from "mongoose"

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
    const {nombre, apellido, _id} = usuarioInformacion

    console.log(usuarioInformacion)
    res.status(200).json({
        nombre, 
        apellido, 
        token, 
        _id, 
        email: usuarioInformacion.email})
}

const registrarUsuario = async(req, res)=>{
    const {email, password} = req.body
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
    await nuevoUsuario.save()
    res.status(200).json({msg: "Usuario registrado con exito"})
}

const perfil = (req, res) => {
    if (req.usuario) {
        delete req.usuario.token;
        delete req.usuario.__v;
    } else {
        return res.status(400).json({ error: 'Información del usuario no encontrada' });
    }

    if (!req.usuario) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(req.usuario);
};


export {
    loginUsuario,
    registrarUsuario,
    perfil
}