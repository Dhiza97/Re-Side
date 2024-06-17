import express from 'express';
import Admin from '../models/adminSchema.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('registerAdmin', { errorMessage: null, successMessage: null });
});

router.post('/', async (req, res) => {
    try {
        const { firstName,
            lastName,
            email,
            password 
        } = req.body;

        // Check if an admin with the same email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.render('admin/registerAdmin', { errorMessage: 'Admin with this email already exists', successMessage: null });
        }

        // Create a new admin user
        const newAdmin = new Admin({
            firstName,
            lastName,
            email,
            password
        });

        // Save the new admin user to the database
        await newAdmin.save();

        return res.render('admin/registerAdmin', { errorMessage: null, successMessage: 'Admin registered successfully!' });
    } catch (error) {
        console.error('Error registering admin:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;