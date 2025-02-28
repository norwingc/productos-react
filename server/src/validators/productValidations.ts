import { body } from "express-validator";

export const productValidations = [
    body("name").notEmpty().withMessage("El nombre es obligatorio"),
    body("price")
        .isNumeric()
        .withMessage("El precio tiene que ser un numero")
        .notEmpty()
        .withMessage("El precio es obligatorio")
        .custom((value) => value > 0)
        .withMessage("El precio tiene que ser mayor a 0"),
    body("available")
        .optional({ nullable: true })
        .isBoolean()
        .withMessage("El estado tiene que ser un booleano o null"),
];
