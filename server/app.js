import express from 'express';
import mongoose from 'mongoose';

import { registerValidation } from './validations/auth.js';
import * as UserController from './controllers/UserController.js';

import handleValidationErrors from './validations/handleValidationErrors.js';


mongoose
.connect("mongodb+srv://totskaiasonia:gc66WkdNxoZ4Nl9A@cluster0.wupwzix.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
});