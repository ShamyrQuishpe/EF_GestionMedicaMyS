import pacientes from "../models/pacientes_model.js"
import mongoose from "mongoose"

//pendiente si listar todos los pacientes o solo 1 por id 
const listarPacientes = async(req,res)=>{
    const paciente = await pacientes.find()
    res.status(200).json(paciente)
}

const registrarPaciente = async(req,res)=>{
    const {email} = req.body

    if(Object.values(req.body).includes("")) return res.status(404).json({
        msg: "Lo sentimos debes llenar todos los campos"
    })

    const paciente = await pacientes.findOne({email})

    if(paciente) return res.status(400).json({
        msg: "Lo sentimos pero el correo del paciente ya se encuentra registrado"
    })

    const nuevoPaciente = new pacientes(req.body)

    console.log(nuevoPaciente)


    await nuevoPaciente.save()

    res.status(200).json({msg: "Paciente registrado"})

}

const actualizarPaciente = async(req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({
        msg: "El id que acaba de ingresar no existe"
    })

    if(Object.values(req.body).includes("")) return res.status(400).json({
        msg: "Lo sentimos, debes llenar todos los campos"
    })

    const paciente = await pacientes.findByIdAndUpdate(id, req.body)
    await paciente.save()
    res.status(200).json({msg: "Paciente actualizado"})
}

const eliminarPaciente = async(req,res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg: "Paciente no encontrado"})
    const paciente = await pacientes.findByIdAndDelete(id)
    if(!paciente) return res.status(400).json({msg: "Paciente no encontrado"})
    res.status(200).json({msg:"Paciente eliminado"})
}

export {
    listarPacientes,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente
}
