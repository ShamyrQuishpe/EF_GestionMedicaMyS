import especialidades from "../models/especialidades_model.js"
import mongoose from "mongoose"

const listarEspecialidadesID = async(req, res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:`Lo sentimos, no existe el id: ${id}`})
    const especialidad = await especialidades.findById(id)
    res.status(200).json(especialidad)
}

//pendiente si listar todas las especialidades o solo 1 por id 
const listarEspecialidades = async(req,res)=>{
    const especialidad = await especialidades.find()
    res.status(200).json(especialidad)
}

const registrarEspecialidad = async(req,res)=>{
    const {codigo} = req.body

    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debes llenar todos los campos"
    })

    const especialidad = await especialidades.findOne({codigo})

    if(especialidad) return res.status(400).json({
        msg: "Lo sentimos pero el codigo de la especialidad ya se encuentra registrado"
    })

    const nuevaEspecialidad = new especialidades(req.body)

    console.log(nuevaEspecialidad)

    await nuevaEspecialidad.save()

    res.status(200).json({msg: "Especialidad registrada"})

}

const actualizarEspecialidad = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: "El id que acaba de ingresar no existe"
    })

    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, debes llenar todos los campos"
    })

    const especialidad = await especialidades.findByIdAndUpdate(id, req.body)
    await especialidad.save()
    res.status(200).json({msg: "Especialidad actualizada"})
}

const eliminarEspecialidad = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg: "Especialidad no encontrada"})
    const especialidad = await especialidades.findByIdAndDelete(id)
    if(!especialidad) return res.status(400).json({msg: "Especialidad no encontrada"})
    res.status(200).json({msg:"Especialidad eliminada"})
}

export {
    listarEspecialidades,
    listarEspecialidadesID,
    registrarEspecialidad,
    actualizarEspecialidad,
    eliminarEspecialidad
}