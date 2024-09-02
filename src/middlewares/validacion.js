import { check, validationResult } from "express-validator";

export const validaciones = [
    check(["nombre","apellido"]).isLength({ min: 4, max: 12 }).withMessage('El campo "nombre" y "apellido" deben tener entre 4 y 12 caracteres')
    .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' }).withMessage('El campo "nombre" y "apellido" debe contener solo letras')
    .customSanitizer(value => value?.trim()),

    check("password").isLength({min:8}).withMessage("El campo debe tener almenos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*).*$/)
    .withMessage('El campo "Password" debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial')
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
    check(["nombre","apellido","cedula","fecha_nacimiento","genero","ciudad","direccion","telefono","email"]).exists()
    .withMessage('Los campos "nombre" "apellido" "cedula" "fecha_nacimiento" "genero" "ciudad" "direccion" "telefono" "email" son obligatorios')
    .notEmpty().withMessage('Los campos "nombre" "apellido" "cedula" "fecha_nacimiento" "genero" "ciudad" "direccion" "telefono" "email" no pueden estar vacíos')
    .customSanitizer(value => value?.trim()),

    check(["nombre","apellido"]).isLength({ min: 4, max: 12 }).withMessage('El campo "nombre" y "apellido" debe tener entre 4 y 12 caracteres')
    .isAlpha('es-ES', { ignore: 'áéíóúÁÉÍÓÚñÑ' }).withMessage('El campo "nombre" y "apellido" debe contener solo letras')
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