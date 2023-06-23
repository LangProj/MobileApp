import mongoose from 'mongoose';

export const WordSchema = mongoose.Schema(
    {
        word: String,
        level: String,
        translation: {
            type: Map,
            of: String,
        },
        partOfSpeech: String,
        category: {
            type: Map,
            of: String,
        },
        pronunciation: String,
        frequency: Number,
        sentence: {
            type: Map,
            of: String,
        },
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Word', WordSchema);