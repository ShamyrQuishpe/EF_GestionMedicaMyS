import { Router } from "express";
import verificar from '../middlewares/auth.js'
import { registrarPaciente, listarPacientes, listarPacientesID, actualizarPaciente, eliminarPaciente } from "../controllers/paciente_controller.js";

const router = Router()

router.post("/pacientes/registro",verificar, registrarPaciente)
router.get("/pacientes/listar", verificar, listarPacientes)
router.get("/pacientes/:id", verificar, listarPacientesID)
router.put("/pacientes/:id", verificar, actualizarPaciente)
router.delete("/pacientes/:id", verificar, eliminarPaciente) //verificar rol preguntar para implementar

export default router