import Router from 'express'
import verificar from '../middlewares/auth.js'
import {loginUsuario, registrarUsuario, perfil } from '../controllers/usuario_controller.js'
const router = Router()

router.post('/usuarios/registro', registrarUsuario)
router.post('/usuarios/login', loginUsuario)
router.get('/perfil', verificar, perfil )

export default router
