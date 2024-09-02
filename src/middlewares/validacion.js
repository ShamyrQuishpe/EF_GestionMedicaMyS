import { check, validationResult } from "express-validator";

export const validaciones = [
    check(["nombre","apellido"]).isLength({ min: 4, max: 12 }).withMessage('El campo "nombre" y/o "apellido" debe(n) tener entre 4 y 12 caracteres')
    .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' }).withMessage('El campo "nombre" y/o "apellido" debe(n) contener solo letras')
    .customSanitizer(value => value?.trim()),

    check("password").isLength({min:8}).withMessage("El campo debe tener almenos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*).*$/)
    .withMessage('El campo "Contraseña" debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
    .customSanitizer(value => value?.trim()),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]

export const validacionPacientes = [
    check(["nombre","apellido"]).isLength({ min: 4, max: 12 }).withMessage('El campo "nombre" y/o "apellido" debe(n) tener entre 4 y 12 caracteres')
    .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' }).withMessage('El campo "nombre" y/o "apellido" debe(n) contener solo letras')
    .customSanitizer(value => value?.trim()),

    check("cedula").isLength({min:10, max:10}).withMessage("El campo cedula debe tener unicamente 10 caracteres"),

    check("telefono").isLength({min:10, max:10}).withMessage("El campo telefono debe tener unicamente 10 caracteres"),

    (req,res,next)=>{
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        } else {
            return res.status(400).send({ errors: errors.array() });
        }
    }
]