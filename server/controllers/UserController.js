import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import PersonalDataModel from '../models/PersonalData.js';
import { check } from 'express-validator';

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        

        const doc = new PersonalDataModel({
            email: (check(req.body.contact).isEmail()) ? req.body.contact : null,
            phoneNumber: (check(req.body.contact).isMobilePhone()) ? req.body.contact : null,
            passwordHash: hash,
        });

        const userPersonalData = await doc.save();

        const token = jwt.sign(
            {
                _id: userPersonalData._id,
            },
            "Phrase123",
            {
                expiresIn: '1d',
            }
        );

        const {passwordHash, ...userData} = userPersonalData._doc;

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