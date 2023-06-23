import mongoose from 'mongoose';

const PersonalDataSchema = mongoose.Schema(
    {
        contacts: {
            type: Map,
            of: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('PersonalData', PersonalDataSchema);