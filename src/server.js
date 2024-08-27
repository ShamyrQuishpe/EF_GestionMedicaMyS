import express from 'express'
import dotenv from'dotenv'
import cors from 'cors'
import routerUsuarios from './routers/usuarios_routes.js'
import routerPacientes from './routers/pacientes_routes.js'

//inicializacion
const app = express()
dotenv.config()

//configuracion
app.set('port', process.env.port || 3000)
app.use(cors())

//midlleware
app.use(express.json())



//rutas
app.get('/', (req,res)=>{
    res.send("Server on")
})

app.use("/api", routerUsuarios )
app.use("/api", routerPacientes)

//Endpoint 404
app.use((req, res) => res.status(404).send("Endpoint no encontrado - 404"));

export default app 