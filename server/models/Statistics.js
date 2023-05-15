import mongoose from 'mongoose';

const StatisticsSchema = mongoose.Schema(
    {
      wordsADay: {
        type: Number,
        default: 0,
      },
      wordsAllTime: {
        type: Number,
        default: 0,
      },
      wordsInLevel: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
);
  
export default mongoose.model('Statistics', StatisticsSchema);