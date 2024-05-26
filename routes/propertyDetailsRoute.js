import express from 'express';
import Property from '../models/propertySchema.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get the details of a specific property
router.get('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const propertyId = req.params.id;
        const property = await Property.findById(propertyId).populate('agent');
        if (!property) {
            return res.status(404).send('Property not found');
        }
        const firstName = req.session.firstName;
        res.render('propertyDetails', { property, firstName });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;