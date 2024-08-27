import { Router } from "express";
import { listarEspecialidades, registrarEspecialidad, actualizarEspecialidad, eliminarEspecialidad } from "../controllers/especialidad_controller.js";

const router = Router()

router.post('/especialidades/registro', registrarEspecialidad)
router.get('/especialidades/listar', listarEspecialidades)
router.put('/especialidades/:id', actualizarEspecialidad)
router.delete('/especialidades/:id', eliminarEspecialidad)

export default router