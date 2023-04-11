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
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('PersonalData', PersonalDataSchema);