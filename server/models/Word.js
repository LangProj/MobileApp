import mongoose from 'mongoose';

const WordSchema = mongoose.Schema(
    {
        word: String,
        level: String,
        translation: {
            type: Map,
            of: String,
        },
        partOfSpeech: String,
        typeof: Array,
        pronunciation: String,
        frequency: Number
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Word', WordSchema);