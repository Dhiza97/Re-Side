import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/adminSchema.js';
import { generateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    // Render adminSignin.ejs
    res.render('admin/adminSignin', { errorMessage: null });
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Attempting admin login for email: ${email}`);

        // Find the admin by email
        const admin = await Admin.findOne({ email });

        if (admin) {
            console.log(`Admin found: ${admin.email}`);
            console.log(`Hashed password from DB: ${admin.password}`); // Log the hashed password from DB

            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            console.log(`Password valid: ${isPasswordValid}`);

            if (!isPasswordValid) {
                return res.render('admin/adminSignin', { errorMessage: 'Invalid email or password' });
            }

            // Store admin's first name and ID in session
            req.session.firstName = admin.firstName;
            req.session.adminId = admin._id;
            req.session.admin = admin;

            const token = generateToken({ adminId: admin._id, email: admin.email });
            console.log(`Token generated: ${token}`);

            req.flash('success_msg', 'You have successfully signed in!');

            // Redirect admin to /admin route
            return res.redirect('/admin/properties');
        } else {
            return res.render('admin/adminSignin', { errorMessage: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error during admin signin:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;