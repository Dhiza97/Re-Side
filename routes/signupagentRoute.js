// import express and User model
import express from 'express';
import User from '../models/agentSchema.js';

// create a router instance
const router = express.Router();

// GET route to render the signup page
router.get('/', (req, res) => {

    // Get the default role from the user schema
    const defaultRole = User.schema.path('role').defaultValue

    // Render signup.ejs
    res.render('signupAgent', { defaultRole });
});

// POST route to handle form submissions for signup
router.post('/', async (req, res) => {
    try {
        // Extract user data from the request body
        const { firstName, lastName, email, phone, password } = req.body;
        // Create a new user
        const user = new User({
            firstName,
            lastName,
            email,
            phone,
            password
        });
        // Save the user to the database
        await user.save();
        // Redirect the user to the home page

        req.flash('success_msg', 'You have successfully signed up!');
        
        res.redirect('/signin');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

// export the router
export default router;