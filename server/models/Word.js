import mongoose from 'mongoose';

const WordSchema = mongoose.Schema(
    {
        word: String,
        translation: {
            type: Map,
            of: String,
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Word', WordSchema);