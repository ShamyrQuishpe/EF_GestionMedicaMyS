import jwt from 'jsonwebtoken'
import usuarios from '../models/usuarios_model.js'

const autenticar = async(req,res,next)=>{
    const token = req.headers.authorization
    if(!token) return res.status(404).json({msg: "Lo sentimos debe proporcionar un token"})
    
    const {authorization} = req.headers

    try{
        const {id, rol} = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET)
        if(rol === "usuario"){
            req.usuario = await usuarios.findById(id).lean().select("-password")
            next()
        }
    }catch(err){
        const e = new Error("Formato de token no valido")
        return res.status(404).json({msg: e.message})
    }

}

export default autenticar
