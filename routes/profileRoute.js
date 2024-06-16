import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';
import upload from '../config/multerConfig.js';
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

router.post('/', ensureAuthenticated, upload.fields([{ name: 'profilePicture' }, { name: 'backgroundPicture' }]), async (req, res) => {
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
            return res.status(404).json({ error: 'User not found' });
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

        // Handle profile picture upload
        if (req.files.profilePicture) {
            user.profilePicture = '/uploads/' + req.files.profilePicture[0].filename;
        }

        // Handle background picture upload
        if (req.files.backgroundPicture) {
            user.backgroundPicture = '/uploads/' + req.files.backgroundPicture[0].filename;
        }

        // Handle password change
        if (currentPassword && newPassword && confirmPassword) {
            const isPasswordValid = await user.comparePassword(currentPassword);
            if (!isPasswordValid) {
                return res.status(400).json({ error: 'Current password is incorrect' });
            }
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ error: 'New passwords do not match' });
            }
            user.password = newPassword; // This will be hashed before saving due to the pre-save hook
        }

        await user.save();
        // res.status(200).json({ success: 'Profile updated successfully' });
        req.flash('success_msg', 'Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'An error occurred. Please try again.' });
    }
});

export default router;