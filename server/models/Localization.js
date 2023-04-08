import mongoose from 'mongoose';

const LocalizationSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            unique: true,
        },
        value: {
            type: Map,
            of: String,
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Localization', LocalizationSchema);