import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: process.env.HOST_MAILTRAP,
    port: process.env.PORT_MAILTRAP,
    auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.PASS_MAILTRAP 
    }
})

const enviarCorreo = (correoU, token) => {
    let configCorreo = {
        from: process.env.USER_MAILTRAPl,
        to: correoU,
        subject: "Verifica tu cuenta :D",
        html: `<p>Da click <a href=${process.env.URL_BACKEND}usuarios/confirmar_email/${encodeURIComponent(token)}>aqui</a> para verificar tu cuenta </p>`
    }

    transporter.sendMail(configCorreo, function(error, info){
        if(err){
            console.log(err)
        }else {
            console.log("Correo enviado con exito", info.response)
        }
    })
}

export {
    enviarCorreo
}