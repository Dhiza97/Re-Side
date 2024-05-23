import express from 'express';
import Property from '../models/propertySchema.js';
import User from '../models/userSchema.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Get user's first name from session (if available)
        const firstName = req.session.firstName || null;

        // Fetch the 6 latest properties from the database
        const latestProperties = await Property.find().sort({ createdAt: -1 }).limit(6);

        // Render home.ejs and pass the latest properties and first name
        res.render('home', { firstName, properties: latestProperties });
    } catch (error) {
        console.error('Error fetching latest properties:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;