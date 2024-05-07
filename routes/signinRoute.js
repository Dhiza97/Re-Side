import express from 'express'
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';

const router = express.Router();


router.post('/signin', async (req, res) => {
    try {
        const { email, password} = req.body

        // Find the user by email
        const user = await User.findOne({ email })

        // If user not found, or password does not match, return error
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Invalid email or password');
        }

        const token = generateToken({ userId: user._id, email: user.email, role: user.role })
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).send('Internal Server Error');
    }
})

export default router;