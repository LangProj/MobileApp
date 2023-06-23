import express from 'express';
import mongoose from 'mongoose';

import { registerValidation, loginValidation } from './validations/auth.js';
import * as UserController from './controllers/UserController.js';
import * as SettingsController from './controllers/SettingsController.js';

import handleValidationErrors from './utils/handleValidationErrors.js';
import checkAuth from './utils/checkAuth.js';

import dotenv from 'dotenv';
dotenv.config();

mongoose
.connect(process.env.DATABASE_URL)
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json());

app.get('/', (req, res)=>res.status(200).json({message: "hello"}));
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/getWordsToLearn', checkAuth, UserController.getWordsToLearn);
app.post('/getWordCountByLevel', UserController.getWordCountByLevel);
app.patch('/updateStatistics', UserController.updateStatistics);
app.post('/getUserWords', checkAuth, UserController.getUserWords);
app.get('/localization/:locale', SettingsController.getLocalization);
app.patch('/addNewWords', checkAuth, UserController.addNewWords);
app.patch('/addWordsByWord', UserController.addWordsByWord);
app.post('/generateSentence', checkAuth, UserController.generateSentence);
app.post('/sendConfirmationEmail', UserController.sendConfirmationEmail);
app.post('/confirmCode', UserController.confirmCode);
app.patch('/updateWords', UserController.updateWords);

//app.patch('localization/:locale');

//settings
app.post('/settings/updateSettings', SettingsController.updateSettings);
app.post('/checkUsername', SettingsController.checkUsername);
app.post('/settings/setUsername', SettingsController.setUsername);
app.post('/settings/setAvatar', SettingsController.setAvatar);
app.post('/settings/setAppLanguage', SettingsController.setAppLanguage);
app.post('/settings/setWordsPerDay', SettingsController.setWordsPerDay);
app.post('/settings/setLevel', SettingsController.setLevel);

app.listen(3000, ()=>{
    console.log('server is listening on port 3000');
});