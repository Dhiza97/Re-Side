import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userSchema.js';
import Agent from '../models/agentSchema.js';
import { generateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    // Render signin.ejs
    res.render('signin', { errorMessage: null });
});

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (user) {
            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.render('signin', { errorMessage: 'Invalid email or password' });
            }

            // Store user's first name in session
            req.session.firstName = user.firstName;
            req.session.user = user;

            const token = generateToken({ userId: user._id, email: user.email, role: user.role });

            req.flash('success_msg', 'You have successfully signed in!');

            // Redirect user to the landing page
            return res.redirect('/');
        } else {
            // Check in the agent collection if user not found in user collection
            const agent = await Agent.findOne({ email });
            if (!agent) {
                return res.render('signin', { errorMessage: 'Invalid email or password' });
            }

            // Compare the provided password with the hashed password stored in the database
            const isPasswordValid = await bcrypt.compare(password, agent.password);
            if (!isPasswordValid) {
                // If passwords don't match, return error message
                return res.render('signin', { errorMessage: 'Invalid email or password' });
            }

            // Store agent's first name and ID in session
            req.session.firstName = agent.firstName;
            req.session.agentId = agent._id;
            req.session.agent = agent;

            req.flash('success_msg', 'You have successfully signed in!');

            // Redirect agent to their dashboard
            return res.redirect('/dashboard');
        }
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
