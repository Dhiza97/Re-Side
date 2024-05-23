// import express and User model
import express from 'express';
import User from '../models/userSchema.js';

// create a router instance
const router = express.Router();

// GET route to render the signup page
router.get('/', (req, res) => {

    // Get the default role from the user schema
    const defaultRole = User.schema.path('role').defaultValue

    // Render signup.ejs
    res.render('signup', { defaultRole });
});

// POST route to handle form submissions for signup
router.post('/', async (req, res) => {
    try {
        // Extract user data from the request body
        const { firstName, lastName, email, password } = req.body;
        // Create a new user
        const user = new User({
            firstName,
            lastName,
            email,
            password
        });
        // Save the user to the database
        await user.save();
        
        req.flash('success_msg', 'You have successfully signed up!');

        // Redirect the user to the home page
        res.redirect('/');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
});

// export the router
export default router;