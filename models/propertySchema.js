import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    propertyName: {
        type: String,
        required: true
    },
    propertyType: {
        type: String,
        enum: ['House', 'Apartment', 'Condo']
    },
    purchaseType: {
        type: String,
        enum: ['rent', 'sale']
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    photos: [
        String
    ],
    description: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    bathroom: {
        type: Number,
        required: true
    },
    agentName: {
        type: String,
        required: true
    },
    agentEmail: {
        type: String,
        required: true
    },
    agentPhone: {
        type: Number,
        required: true
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    }
}, {
    timestamps: true
});

const Property = mongoose.model('Property', propertySchema);

export default Property;