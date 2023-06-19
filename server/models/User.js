import mongoose, { Schema } from 'mongoose';
import { WordSchema } from './Word.js';

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
        words: {
            type: Array,
            of: {
                type: Map,
                of: WordSchema
            }
        },
        statistics: {
            type: Schema.Types.ObjectId,
            ref: 'Statistics',
            required: true,
        },
        subscription: {
            type: Schema.Types.ObjectId,
            ref: 'Subscription',
            required: true,
        },
        verificationCode: {
            type: String,
            default: null,
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('User', UserSchema);