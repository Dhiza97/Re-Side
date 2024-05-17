import express from 'express';
import Agent from '../models/agentSchema.js';
import Property from '../models/propertySchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Find properties linked to the logged-in agent
        const properties = await Property.find({ agent: req.session.agentId });

        const firstName = req.session.firstName;
        
        res.render('dashboard', { firstName, properties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
