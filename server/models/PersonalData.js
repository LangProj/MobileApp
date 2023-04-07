import mongoose from 'mongoose';

const PersonalDataSchema = mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        username: {
            type: String,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('PersonalData', PersonalDataSchema);