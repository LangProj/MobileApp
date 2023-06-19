import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import SettingsModel from '../models/Settings.js';
import PersonalDataModel from '../models/PersonalData.js';
import SubscriptionModel from '../models/Subscription.js';
import WordModel from '../models/Word.js';
import StatisticsModel from '../models/Statistics.js';
import * as openai from 'openai';
import validator from 'validator';
import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

import { Types } from 'mongoose';

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
        if (userContactDoc && userContactDoc._doc.isVerified) {
            return res.status(409).json({
                message: "Such email is already registred",
            });
        }
        
        if (userContactDoc && !userContactDoc._doc.isVerified) {
            const user = await UserModel.findOne({personalData: userContactDoc._id});
            const {passwordHash, ...userData} = user._doc;
            const token = jwt.sign(
                {
                    _id: user._id,
                },
                "Phrase123",
                {
                    expiresIn: '1d',
                }
            );

            return res.status(200).json({
                ...userData,
                token,
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
        

        //      -------     STATISTICS DOCUMENT   -------

        const statisticsDoc = new StatisticsModel();
        const statistics = await statisticsDoc.save();


        //      -------     USER DOCUMENT   -------

        const UserDoc = new UserModel({
            personalData: personalData._id,
            settings: settings._id,
            statistics: statistics._id,
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
        if (!userPersonalData || !userPersonalData._doc.isVerified) {
            return res.status(404).json({
                message: "User was not found",
            });
        }
        if (!await bcrypt.compare(req.body.password, userPersonalData._doc.passwordHash)) {
            return res.status(400).json({
                message: "Incorrect password",
            });
        }

        const user = await UserModel.findOne({personalData: userPersonalData._id});
        const settings = await SettingsModel.findById(user._doc.settings);
        const statistics = await StatisticsModel.findById(user._doc.statistics);
        console.log(statistics);

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
            _id: user._id,
            words: user._doc.words,
            token,
            settings,
            statistics,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to sign in"
        });
    }
}



export const getWordsToLearn = async (req, res) => {
    try {
        const userId = req.body.userId;

        const user = await UserModel.findById(userId);
        const wordsId = user._doc.words.map(word => new Types.ObjectId(word.get('word')._id));


        const maxWords = parseInt(req.body.maxWords); 
    
    
        const words = await WordModel.aggregate([
            { $match: { _id: { $nin: wordsId } } }, 
            { $sample: { size: maxWords } }, 
        ]);
        
        res.status(200).json({ 
            words: words 
        });
        } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to retrieve words to learn",
        });
    }
};

export const addNewWords = async (req, res) => {
    try {
        const user = await UserModel.findOneAndUpdate(
            {
                _id: req.body.userId,
            },
            {
                $push: {words: req.body.newWords}
            }
        );

        await user.save();

        res.status(200).json(user.words);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to send new words to db"
        });
    }
};

export const updateWords = async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);

        const wordsArray = req.body.words.map(elem => new Map(Object.entries(elem)));

        user.words = wordsArray;

        await user.save();

        res.status(200).json({
            message: "Updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Failed to update words"
        });
    }
}

export const getWordCountByLevel = async (req, res) => {
  try {
    const level = req.body.level;
    

    const wordCount = await WordModel.countDocuments({ level: level });

    res.status(200).json({
      wordCount: wordCount,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to retrieve word count by level",
    });
  }
};

export const updateStatistics = async(req, res) => {
    try {
        const userId = req.body.id;
        const user = await UserModel.findById(userId);
        
        const statistics = await StatisticsModel.findById(user._doc.statistics);

        statistics.wordsADay = req.body.wordsADay;
        statistics.wordsAllTime = req.body.wordsAllTime;
        statistics.wordsInLevel = req.body.wordsInLevel;

        statistics.save();

        res.status(200).json({
            message: "Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
        message: "Failed to retrieve word count by level",
    });
    }
};

export const getUserWords = async (req, res) => {
    try {
      const userId = req.body.userId;
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      const words = user.words;

      res.status(200).json({
        words: words,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to retrieve user words",
      });
    }
};



export const generateSentence = async (req, res) => {
    try {
        const { language, level, grammaticalTheme } = req.body;

        const prompt1 = `Составь предложение на ${language} уровня ${level} на грамматическую тему "${grammaticalTheme}"`;
        
        // мой ключик (Соня)
        const openaiApiKey = process.env.API_KEY;
        console.log(openaiApiKey);
        const config = new openai.Configuration({
            apiKey: openaiApiKey,
        });
        const openaiApi = new openai.OpenAIApi(config);
        // генерация предложения на родном языке
        const responseOriginal = await openaiApi.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: prompt1 }],
            max_tokens: 50,
            temperature: 0.7,
            n: 1,
        });
        console.log(responseOriginal.data.choices[0].message.content);

        const prompt2 = `Напиши английский перевод предложения - ${responseOriginal.data.choices[0].message.content}`;

        // генерация перевода предложения
        const responseTranslated = await openaiApi.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: prompt2 }],
            max_tokens: 50,
            temperature: 0.7,
            n: 1,
        });
        console.log(responseTranslated.data.choices[0].message.content);

        res.status(200).json({
            nativeLangSentence: responseOriginal.data.choices[0].message.content,
            englishSentence: responseTranslated.data.choices[0].message.content,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: 'Failed to generate sentences',
        });
    }
}

export const sendConfirmationEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              user: process.env.EMAIL_USERNAME,
              pass: process.env.EMAIL_PASSWORD,
            },
        });
        function generateConfirmationCode() {
            return Math.floor(100000 + Math.random() * 900000).toString();
        }
        const userId = req.body.id;

        const userEmail = req.body.email;

        const user = await UserModel.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' });
        }

        const confirmationCode = generateConfirmationCode();
    
        user.verificationCode = confirmationCode;
        await user.save();
        console.log(user.verificationCode);
        const mailOptions = {
          from: 'speechsonia@gmail.com',
          to: userEmail, 
          subject: 'Confirmation code',
          text: `Your verification code: ${confirmationCode}`,
        };
    
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({ message: 'Confirmation email sent' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send confirmation email' });
      }
    }

    export const confirmCode = async (req, res) => {
        try {
          const { userId, code } = req.body;
      
          const user = await UserModel.findById(userId);
      
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          console.log(user.verificationCode);
          if (user.verificationCode === code) {
            const personalData = await PersonalDataModel.findById(user._doc.personalData);
            
            personalData.isVerified = true;

            await personalData.save();
            await user.save();
      
            return res.status(200).json({ message: 'Code confirmed successfully' });
          } else {
            return res.status(400).json({ message: 'Invalid verification code' });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Failed to confirm code' });
        }
      };