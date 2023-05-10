import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations/auth.js';
import * as UserController from './controllers/UserController.js';
import * as SettingsController from './controllers/SettingsController.js';

import handleValidationErrors from './utils/handleValidationErrors.js';


mongoose
.connect("mongodb+srv://totskaiasonia:gc66WkdNxoZ4Nl9A@cluster0.wupwzix.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/updateSettings', UserController.updateSettings);
app.post('/getWordsToLearn', UserController.getWordsToLearn);
app.get('/localization/:locale', SettingsController.getLocalization);
app.patch('/addNewWords',UserController.addNewWords);
//app.patch('localization/:locale');

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
});