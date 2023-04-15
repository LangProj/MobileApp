import LocalizationModel from '../models/Localization.js';

export const getLocalization = async (req, res) => {
    try {
        const locales = await LocalizationModel.find({}, `key value.${req.params.locale}`).exec();
        const result = {}
        locales.forEach(doc => {
            result[doc.key] = doc.value.get(req.params.locale);
        });
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to load localization",
        });
    }
}