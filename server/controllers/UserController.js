import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import SettingsModel from '../models/Settings.js';
import PersonalDataModel from '../models/PersonalData.js';
import SubscriptionModel from '../models/Subscription.js';
import WordModel from '../models/Word.js';

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

        const user = await UserModel.findOne({personalData: userPersonalData._id});
        const settings = await SettingsModel.findById(user._doc.settings);

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
        const userId = req.body.userId;
        const user = await UserModel.findById(userId);
        const settingsId = user.settings;
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


export const getWordsToLearn = async (req, res) => {
    try {
      const userId = req.body.userId;
      const user = await UserModel.findById(userId);
  
      const wordsId = user.words;
      let userWords = [];
  
      if (wordsId && wordsId.length > 0) {
        userWords = await WordModel.find({ _id: { $in: wordsId } });
      }
  
      const maxWords = parseInt(req.body.maxWords); 
  
 
      const words = await WordModel.aggregate([
        { $match: { _id: { $nin: wordsId } } }, 
        { $sample: { size: maxWords } }, 
      ]);
  
      console.log(words);
      console.log(userWords);
      const wordsToLearn = words.concat(userWords); 
      res.status(200).json({ 
        words: wordsToLearn 
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
        console.log(req.body.userId);
        console.log(req.body.newWords);

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