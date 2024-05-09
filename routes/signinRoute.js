import express from 'express'
import bcrypt from 'bcrypt'
import User from '../models/userSchema.js';
import Agent from '../models/agentSchema.js'
import { generateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
    // Render signin.ejs
    res.render('signin', {errorMessage: null});
})
router.post('/', async (req, res) => {

    try {
        const { email, password} = req.body

        // Find the user by email
        const user = await User.findOne({ email })
    
        // If user is not found in the user collection, check in the agent collection
        if (!user) {
            const agent = await Agent.findOne({ email });
            if (!agent) {
                return res.render('signin', { errorMessage: 'Invalid email or password' });
            }
        
            // Perform authentication logic for agents
            // For simplicity, assume authentication logic here

            return res.redirect('/dashboard');
        }
        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // If passwords don't match, return error message
            return res.render('signin', { errorMessage: 'Invalid email or password' });
        }

        const token = generateToken({ userId: user._id, email: user.email, role: user.role })

        // Perform authentication logic for users
        // For simplicity, assume authentication logic here

        // Store user's first name in session
        req.session.firstName = user.firstName;

        // Redirect user to the landing page
        return res.redirect('/');
        
    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).send('Internal Server Error');
    }
})

export default router;