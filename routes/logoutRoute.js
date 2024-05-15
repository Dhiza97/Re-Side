import express from 'express';

const router = express.Router();

// Logout route
router.get('/', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Redirect to the homepage after logout
        res.redirect('/signin');
    });
});

export default router;