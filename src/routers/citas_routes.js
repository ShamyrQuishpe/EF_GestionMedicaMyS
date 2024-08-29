import { Router } from "express";
import verificar from '../middlewares/auth.js'
import { listarCitas, listarCitasID, registrarCitas, actualizarCitas, eliminarCita } from "../controllers/citas_controller.js";

const router = Router()

router.post('/citas/registrar', verificar, registrarCitas)
router.get('/citas/listar', verificar, listarCitas)
router.get('/citas/:id', verificar, listarCitasID)
router.put('/citas/:id', verificar, actualizarCitas)
router.delete('/citas/:id', verificar, eliminarCita)

export default router