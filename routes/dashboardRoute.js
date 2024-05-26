import express from 'express';
import Property from '../models/propertySchema.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
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
