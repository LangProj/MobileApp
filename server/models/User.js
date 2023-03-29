import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatar: URL,
        motherTongue: {
            type: String,
            required: true,
        },
        wordsToLearn: {
            type: Number,
            required: true,
            default: 10,
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('User', UserSchema);