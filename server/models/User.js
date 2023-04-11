import mongoose, { Schema } from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        personalData: {
            type: Schema.Types.ObjectId,
            ref: 'PersonalData',
            required: true,
        },
        settings: {
            type: Schema.Types.ObjectId,
            ref: 'Settings',
            required: true,
        },
        words: [Schema.Types.ObjectId],
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('User', UserSchema);