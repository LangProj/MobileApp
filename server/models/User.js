import mongoose, { Schema } from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        personalData: {
            type: Schema.Types.ObjectId,
            requeired: true,
        },
        settings: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        words: [Schema.Types.ObjectId],
        subscription: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('User', UserSchema);