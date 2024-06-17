import express from 'express';
import Property from '../models/propertySchema.js';
import { ensureAuthenticated, ensureAdmin } from '../middleware/authMiddleware.js'; // Import ensureAdmin from middleware

const router = express.Router();

// Route to get the admin dashboard
router.get('/admin', ensureAdmin, async (req, res) => {
    try {
        res.render('admin/properties'); // Render the admin dashboard or redirect to properties
    } catch (error) {
        console.error('Error loading admin dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get all pending properties
router.get('/admin/properties', ensureAdmin, async (req, res) => {
    try {
        const pendingProperties = await Property.find({ status: 'pending' });
        res.render('admin/properties', { properties: pendingProperties });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to approve a property
router.post('/admin/properties/approve/:id', ensureAdmin, async (req, res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id, { status: 'approved' });
        req.flash('success_msg', 'Property approved successfully');
        res.redirect('/admin/properties');
    } catch (error) {
        console.error('Error approving property:', error);
        req.flash('error_msg', 'An error occurred while approving the property');
        res.redirect('/admin/properties');
    }
});

// Route to reject a property
router.post('/admin/properties/reject/:id', ensureAdmin, async (req, res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        req.flash('success_msg', 'Property rejected successfully');
        res.redirect('/admin/properties');
    } catch (error) {
        console.error('Error rejecting property:', error);
        req.flash('error_msg', 'An error occurred while rejecting the property');
        res.redirect('/admin/properties');
    }
});

export default router;