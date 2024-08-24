import Router from 'express'

const router = Router()

router.post('/registro')
router.post('/login')
router.get('/confirmar/:token')
router.get('/usuarios')
router.get('/recuperar-password')
router.get('/recuperar-password/:token')

