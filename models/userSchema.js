import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { 
        type: String,  
        unique: true,  
        lowercase: true,  
        required: [true, "can't be blank"],  
        match: [/\S+@\S+\.\S+/, 'is invalid'],  
    },
    role: { 
        type: String,
        required: true,
        default: 'Customer' 
    },
    password: {  
        type: String,  
        minlength: 8,   
        required: [true, "can't be blank"]    
    }
});

// Hash password before saving user
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model('User', userSchema);

export default User;