import mongoose from 'mongoose';

const SettingsSchema = mongoose.Schema(
    {
        duration: String,
        price: Schema.Types.Decimal128,
        startDate: Date,
        cardNumberTocken: String,
        subscriptionState: {
            type: String,
            default: 'Not started',
        }
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('Settings', SettingsSchema);