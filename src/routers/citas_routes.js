import { Router } from "express";
import { listarCitas, registrarCitas, actualizarCitas, eliminarCita } from "../controllers/citas_controller.js";

const router = Router()

router.post('/citas/registrar', registrarCitas)
router.get('/citas/listar', listarCitas)
router.put('/citas/:id', actualizarCitas)
router.delete('/citas/:id', eliminarCita)

export default router