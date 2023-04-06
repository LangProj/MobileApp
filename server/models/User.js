import mongoose from 'mongoose';

const UserSchema = mongoose.Schema(
    {
    
    },
    {
        timestamp: true,
    }
);

export default mongoose.model('User', UserSchema);