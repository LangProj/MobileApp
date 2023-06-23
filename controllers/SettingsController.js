import LocalizationModel from '../models/Localization.js';
import SettingsModel from '../models/Settings.js';
import UserModel from '../models/User.js';
import fs from 'fs';

export const getLocalization = async (req, res) => {
    try {
        fs.access(`./lang/${req.params.locale}.json`, fs.constants.R_OK, err => {
            if (err) {
                console.log(err);
                res.status(404).json({
                    message: `Failed to load locale ${req.params.locale}`
                });
            }
            else {
                fs.readFile(`./lang/${req.params.locale}.json`, 'utf-8', (err, data) => {
                    if (err) {
                        console.log(err);
                        res.status(404).json({
                            message: "Error occured",
                        });
                    }
                    else {
                        const tmp = JSON.parse(data);
                        console.log(tmp);
                        const result = {}
                        tmp.forEach(element => {
                            result[Object.keys(element)[0]] = element[Object.keys(element)[0]];
                        });
                        console.log(result);
                        res.status(200).json(result);
                    }
                });
            }
        })
        // const locales = await LocalizationModel.find({}, `key value.${req.params.locale}`).exec();
        // const result = {}
        // locales.forEach(doc => {
        //     result[doc.key] = doc.value.get(req.params.locale);
        // });
        // console.log(result);
        // res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to load localization",
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

export const checkUsername = async (req, res) => {
  try {
    const usernameToCheck = req.body.username;
    const username = await SettingsModel.findOne({username: usernameToCheck});
    if (username) {
      return res.status(409).json({
        message: "Such username is already in use"
      });
    } 
    return res.status(200).json({
      message: "Username is not taken yet"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to check username",
    });
  }
}

export const setUsername = async (req, res) => {
    try {
      const userId = req.body.userId;
      const newUsername = req.body.username;

      const user = await UserModel.findById(userId);
      user.username = newUsername;
      await user.save();
  
      res.status(200).json({
        message: "Username updated",
        username: newUsername,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update username",
      });
    }
};
  
  export const setAvatar = async (req, res) => {
    try {
      const userId = req.body.userId;
      const newAvatar = req.body.avatar;
  
      const user = await UserModel.findById(userId);
      user.avatar = newAvatar;
      await user.save();
  
      res.status(200).json({
        message: "Avatar updated",
        avatar: newAvatar,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update avatar",
      });
    }
};

  export const setAppLanguage = async (req, res) => {
    try {
      const userId = req.body.userId;
      const newLanguage = req.body.language;
  
      const user = await UserModel.findById(userId);
      user.appLanguage = newLanguage;
      await user.save();
  
      res.status(200).json({
        message: "App language updated",
        language: newLanguage,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update app language",
      });
    }
};
  
  export const setWordsPerDay = async (req, res) => {
    try {
      const userId = req.body.userId;
      const newWordsPerDay = req.body.wordsPerDay;
  
      const user = await UserModel.findById(userId);
      user.wordsPerDay = newWordsPerDay;
      await user.save();
  
      res.status(200).json({
        message: "Words per day updated",
        wordsPerDay: newWordsPerDay,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update words per day",
      });
    }
};
  
  export const setLevel = async (req, res) => {
    try {
      const userId = req.body.userId;
      const newLevel = req.body.level;
  
      const user = await UserModel.findById(userId);
      console.log(user.settings);
      const settings = await SettingsModel.findById(user.settings);
      console.log(settings.level);
      settings.level = newLevel;
      await settings.save();
      return res.status(200).json({
        message: "User level updated",
        level: newLevel,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Failed to update user level",
      });
    }
};