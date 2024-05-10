import express from 'express'
import Property from '../models/propertySchema.js';

const router = express()

router.get('/', (req, res) => {
    // Render Add Property Page
    res.render('addProperty');
})

router.post('/', async (req, res) => {

    try {
        // Extract property data from request body
        const { 
            propertyName, 
            propertyType,
            purchaseType,
            address,
            city,
            state,
            zip,
            price,
            description,
            photos,
            bedroom,
            bathroom,
            agentName,
            agentEmail,
            agentPhone
            } = req.body;

        // Validate the property data (optional)

        // Create a new property document
        const property = new Property({
            propertyName, 
            propertyType,
            purchaseType,
            address,
            city,
            state,
            zip,
            price,
            description,
            photos,
            bedroom,
            bathroom,
            agentName,
            agentEmail,
            agentPhone
        });

        // Associate the property with the logged-in agent
        property.agent = req.user._id; // Assuming req.user contains the agent's information

        // Save the property document to the database
        await property.save();

        // Redirect to the agent's dashboard or send a success response
        res.redirect('/dashboard');
    } catch (error) {
        // Handle errors
        console.error('Error creating property:', error);
        res.status(500).send('Internal Server Error');
    }
})

export default router;