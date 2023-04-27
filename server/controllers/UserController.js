import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import SettingsModel from '../models/Settings.js';
import PersonalDataModel from '../models/PersonalData.js';
import SubscriptionModel from '../models/Subscription.js';

import validator from 'validator';

export const register = async (req, res) => {
    try {

        //      -------     PASSWORD ENCRYPTING     -------

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);


        //      -------     EMAIL EXISTENCE CHECK   -------

        const userContactDoc = await PersonalDataModel.findOne({
            contacts: {
                email: validator.isEmail((req.body.contact)) ? req.body.contact : null, 
                phoneNumber: validator.isMobilePhone((req.body.contact)) ? req.body.contact : null
            }
        });
        if (userContactDoc) {
            return res.status(409).json({
                message: "Such email is already registred",
            });
        }


        //      -------     PERSONALDATA DOCUMENT   -------
        
        const personalDataDoc = new PersonalDataModel({
            contacts: {
                email: validator.isEmail((req.body.contact)) ? req.body.contact : null,
                phoneNumber: validator.isMobilePhone((req.body.contact)) ? req.body.contact : null,
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

        res.status(200).json({
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
        const userPersonalData = await PersonalDataModel.findOne({
            contacts: {
                email: validator.isEmail((req.body.contact)) ? req.body.contact : null, 
                phoneNumber: validator.isMobilePhone((req.body.contact)) ? req.body.contact : null
            }
        });
        if (!userPersonalData) {
            return res.status(404).json({
                message: "User was not found",
            });
        }
        if (!await bcrypt.compare(req.body.password, userPersonalData._doc.passwordHash)) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        const user = UserModel.findOne({personalData: userPersonalData._id});

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'Phrase123',
            {
                expiresIn: '1d',
            }
        );

        const {passwordHash, contacts, ...userData} = userPersonalData._doc;

        res.json({
            email: contacts.get("email"),
            phone: contacts.get("phoneNumber"),
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
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);
        const settingsId = user.settingsId;
        const updatedSettings = {
            avatar: req.body.avatar,
            appLanguage: req.body.appLanguage,
            username: req.body.username,
            wordsPerDay: req.body.wordsPerDay,
            level: req.body.level,
        };
        const options = { new: true };
        const settings = await SettingsModel.findByIdAndUpdate(
            settingsId,
            updatedSettings,
            options
        );
        res.status(200).json({
            message: "Settings updated",
            settings,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to update user preferences",
        });
    }
};