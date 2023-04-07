import mongoose from 'mongoose';

const LocalizationSchema = mongoose.Schema(
    {
        str: {
            type: String,
            required: true,
            unique: true,
        }
        
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Localization', LocalizationSchema);