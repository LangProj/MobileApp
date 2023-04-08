import { body, check } from 'express-validator';

export const registerValidation = [
    body('contact', "Incorrect format").custom((value) => {
        return (check(value).isEmail() || check(value).isMobilePhone());
    }),
    body('password', "Password must be longer than 8 symbols").isLength({ min: 8 }),
    body('confirmPassword').custom((value, { req }) => {
        if(value != req.body.password)
            throw new Error("Password confirmation doesn't match");
        return true;
    }),
];