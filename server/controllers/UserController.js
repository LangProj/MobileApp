import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import SettingsModel from '../models/Settings.js';
import PersonalDataModel from '../models/PersonalData.js';
import SubscriptionModel from '../models/Subscription.js';

import { check } from 'express-validator';

export const register = async (req, res) => {
    try {

        //      -------     PASSWORD ENCRYPTING     -------

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        //      -------     EMIAL EXISTENCE CHECK   -------

        const userContactDoc = await PersonalDataModel.findOne({contacts: {email: check(req.body.contact).isEmail() ? req.body.contact : null, phoneNumber: check(req.body.contact).isMobilePhone() ? req.body.contact : null}});
        if (userContactDoc) {
            return res.json({
                message: "Such email is already registred",
            });
        }


        //      -------     PERSONALDATA DOCUMENT   -------

        const personalDataDoc = new PersonalDataModel({
            contacts: {
                email: (check(req.body.contact).isEmail()) ? req.body.contact : null,
                phoneNumber: (check(req.body.contact).isMobilePhone()) ? req.body.contact : null,
            },
            passwordHash: hash,
        });
        const personalData = await personalDataDoc.save();
        

        //      -------     SETTINGS DOCUMENT   -------

        const settingsDoc = new SettingsModel({
            username: personalData._id,
        });
        const settings = await settingsDoc.save();
        


        //      -------     USER DOCUMENT   -------

        const UserDoc = new UserModel({
            personalData: personalData._id,
            settings: settings._id,
            subscription: (await SubscriptionModel.findOne({name: "Free"}, '_id'))._id,
        });

        const user = await UserDoc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "Phrase123",
            {
                expiresIn: '1d',
            }
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to register",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = UserModel.findOne({personalData: {email: req.body.email}});
        if (!user) {
            return res.status(404).json({
                message: "User was not found",
            });
        }
        if (!await bcrypt.compare(req.body.password, user._doc.personalData.passwordHash)) {
            return res.status(404).json({
                message: "Incorrect password",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'Phrase123',
            {
                expiresIn: '1d',
            }
        );

        const {personalData, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to sign in"
        });
    }
}

export const updateSettings = async (req, res) => {
    try {
        const userId = req.userId;
        const settings = new SettingsModel({
            avatar: req.body.avatar,
            appLanguage: req.body.appLanguage,
            username: req.body.username,
            wordsPerDay: req.body.wordsPerDay,
            level: req.body.level,
            userId: userId,
        });
        await settings.save();
        res.status(200).json(settings);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to create user preferences",
        });
    }
};