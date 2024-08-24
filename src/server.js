import express from 'express'
import dotenv from'dotenv'
import cors from 'cors'

//inicializacion
const app = express()
dotenv.config()

//configuracion
app.set('port', process.env.port || 3000)
app.use(cors())

//midlleware
app.use(express.json())

//variables globales

//rutas
app.get('/', (req,res)=>{
    res.send("Server on")
})

export default app 