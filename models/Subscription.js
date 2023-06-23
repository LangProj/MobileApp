import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = mongoose.Schema(
    {
        name: String,
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

export default mongoose.model('Subscription', SubscriptionSchema);