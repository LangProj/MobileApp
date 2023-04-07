import mongoose from 'mongoose';

const SettingsSchema = mongoose.Schema(
    {
        avatar: String,
        appLanguage: {
            type: String,
            default: "en",
        },
        wordsPerDay: {
            type: Number,
            default: 10,
        },
        level: {
            type: String,
            default: 'A1',
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Settings', SettingsSchema);