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
    middleName: {
        type: String,
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
        default: 'Client' 
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    country: {
        type: String,
    },
    password: {  
        type: String,  
        minlength: 8,   
        required: [true, "can't be blank"]    
    },
    profilePicture: { 
        type:String 
    },
    backgroundPicture: { 
        type:String
    },
}, {
    timestamps: true,
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

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;