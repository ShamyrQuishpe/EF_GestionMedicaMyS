import citas from '../models/citas_model.js'
import mongoose from "mongoose"

//pendiente si listar todas las especialidades o solo 1 por id 
const listarCitas = async(req,res)=>{
    const cita = await citas.find()
    res.status(200).json(cita)
}

const registrarCitas = async(req,res)=>{
    const {codigo} = req.body

    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debes llenar todos los campos"
    })

    const cita = await citas.findOne({codigo})

    if(cita) return res.status(400).json({
        msg: "Lo sentimos pero el codigo de cita ya se encuentra registrado"
    })

    const nuevaCita = new citas(req.body)

    console.log(nuevaCita)

    await nuevaCita.save()

    res.status(200).json({msg: "Cita registrada"})

}

const actualizarCitas = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: "El id que acaba de ingresar no existe"
    })

    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, debes llenar todos los campos"
    })

    const cita = await citas.findByIdAndUpdate(id, req.body)
    await cita.save()
    res.status(200).json({msg: "Cita actualizada"})
}

const eliminarCita = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg: "Cita no encontrada"})
    const cita = await citas.findByIdAndDelete(id)
    if(!cita) return res.status(400).json({msg: "Cita no encontrada"})
    res.status(200).json({msg:"Especialidad eliminada"})
}

export {
    listarCitas,
    registrarCitas,
    actualizarCitas,
    eliminarCita
}