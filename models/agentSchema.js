import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema({
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
        default: 'agent',
    },
    password: {  
        type: String,  
        minlength: 8,   
        required: [true, "can't be blank"]    
    },
    confirmPassword: {
        type: String,
        required: [true, "can't be blank"],
        validate: {
            validator: function(value) {
                return this.password === value
            },
            message: "Passwords don't match"
        }
    }
})

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent