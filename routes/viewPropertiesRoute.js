import express from 'express';
import Property from '../models/propertySchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const properties = await Property.find().populate('agent');
        const firstName = req.session.firstName || ''; // Get firstName from session, default to empty string if not present
        res.render('viewProperties', { properties, firstName });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
