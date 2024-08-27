import { Router } from "express";
import { registrarPaciente, listarPacientes, actualizarPaciente, eliminarPaciente } from "../controllers/paciente_controller.js";

const router = Router()

router.post("/pacientes/registro", registrarPaciente)
router.get("/pacientes/listar", listarPacientes)
router.put("/pacientes/:id", actualizarPaciente)
router.delete("/pacientes/:id", eliminarPaciente) //verificar rol preguntar para implementar

export default router