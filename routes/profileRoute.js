import express from 'express';
import bcrypt from 'bcrypt';
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
        const { 
            firstName, 
            lastName,
            middleName,
            email, 
            phone,
            address,
            city,
            state,
            country,
            currentPassword, 
            newPassword, 
            confirmPassword 
        } = req.body;

        const user = await User.findById(req.session.userId);
        if (!user) {
            req.flash('error_msg', 'User not found');
            return res.redirect('/signin');
        }

        // Update basic profile information
        user.firstName = firstName;
        user.lastName = lastName;
        user.middleName = middleName;
        user.email = email;
        user.phone = phone;
        user.address = address;
        user.city = city;
        user.state = state;
        user.country = country;

        // Handle password change
        if (currentPassword && newPassword && confirmPassword) {
            const isPasswordValid = await user.comparePassword(currentPassword);
            if (!isPasswordValid) {
                req.flash('error_msg', 'Current password is incorrect');
                return res.redirect('/profile');
            }
            if (newPassword !== confirmPassword) {
                req.flash('error_msg', 'New passwords do not match');
                return res.redirect('/profile');
            }
            user.password = newPassword; // This will be hashed before saving due to the pre-save hook
        }

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