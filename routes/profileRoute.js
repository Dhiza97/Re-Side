import express from 'express';
import User from '../models/userSchema.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            req.flash('error_msg', 'User not found');
            return res.redirect('/signin');
        }
        res.render('profile', { user });
    } catch (error) {
        console.error('Error fetching user:', error);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/');
    }
});

router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        const user = await User.findById(req.session.userId);
        if (!user) {
            req.flash('error_msg', 'User not found');
            return res.redirect('/signin');
        }
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        await user.save();
        req.flash('success_msg', 'Profile updated successfully');
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating profile:', error);
        req.flash('error_msg', 'An error occurred. Please try again.');
        res.redirect('/profile');
    }
});

export default router;