import express from 'express';
import Property from '../models/propertySchema.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const filter = req.query.filter || 'All';
        let query = {};

        if (filter !== 'All') {
            query.purchaseType = filter.toLowerCase();
        }

        const properties = await Property.find(query, { status: 'approved' }).populate('agent').sort({ createdAt: -1 });
        const firstName = req.session.firstName || ''; // Get firstName from session, default to empty string if not present

        res.render('viewProperties', { properties, firstName, filter });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;