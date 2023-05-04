import LocalizationModel from '../models/Localization.js';
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