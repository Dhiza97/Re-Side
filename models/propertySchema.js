import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema ({
    filename: String,
    path: String,
    mimetype: String,
    size: Number
})

const propertySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    PropertyType: {
        type: String,
        enum: [ house, apartment, condo ],
        required: true
    },
    purchaseType: {
        type: String,
        enum: [ rent, sale ],
        required: true
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
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    photos: {
        type: [fileSchema],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bedroom: {
        type: Number,
        required: true
    },
    Bathroom: {
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
        ref: 'Agent'
    }
})

const Property = mongoose.model('Property', propertySchema);

export default Property;