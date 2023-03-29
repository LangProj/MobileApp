import { body } from 'express-validator';

export const registerValidation = [
    body('email', "Incorrect format").isEmail(),
    body('password', "Password must be longer than 8 symbols").length({ min: 8 }),
];