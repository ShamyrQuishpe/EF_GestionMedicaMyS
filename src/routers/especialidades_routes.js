import { Router } from "express";
import verificar from '../middlewares/auth.js'
import { listarEspecialidades, listarEspecialidadesID, registrarEspecialidad, actualizarEspecialidad, eliminarEspecialidad } from "../controllers/especialidad_controller.js";

const router = Router()

router.post('/especialidades/registro', verificar, registrarEspecialidad)
router.get('/especialidades/listar', verificar, listarEspecialidades)
router.get('/especialidades/:id', verificar, listarEspecialidadesID)
router.put('/especialidades/:id', verificar, actualizarEspecialidad)
router.delete('/especialidades/:id', verificar, eliminarEspecialidad)

export default router