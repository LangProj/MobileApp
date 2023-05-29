import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations/auth.js';
import * as UserController from './controllers/UserController.js';
import * as SettingsController from './controllers/SettingsController.js';

import handleValidationErrors from './utils/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js'


mongoose
.connect("mongodb+srv://totskaiasonia:gc66WkdNxoZ4Nl9A@cluster0.wupwzix.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/getWordsToLearn', checkAuth, UserController.getWordsToLearn);
app.post('/getWordCountByLevel', checkAuth, UserController.getWordCountByLevel);
app.post('/getUserWords', checkAuth, UserController.getUserWords);
app.get('/localization/:locale', SettingsController.getLocalization);
app.patch('/addNewWords', checkAuth, UserController.addNewWords);
//app.patch('localization/:locale');

//settings
app.post('/settings/updateSettings', SettingsController.updateSettings);
app.post('/settings/setUsername', SettingsController.setUsername);
app.post('/settings/setAvatar', SettingsController.setAvatar);
app.post('/settings/setAppLanguage', SettingsController.setAppLanguage);
app.post('/settings/setWordsPerDay', SettingsController.setWordsPerDay);
app.post('/settings/setLevel', SettingsController.setLevel);

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
});