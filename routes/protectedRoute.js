import express from 'express';
import { verifyToken } from './authMiddleware.js';

const router = express.Router();

// Protected route that requires authentication
// router.get('/profile', verifyToken, (req, res) => {
//   // Access user information from req.user
//   const { userId, email, role } = req.user;
//   res.send(`Welcome ${email} (ID: ${userId}), your role is ${role}`);
// });

// Another protected route
router.get('/dashboard', verifyToken, (req, res) => {
  // Check if user has agent role
    if (req.user.role !== 'agent') {
        return res.status(403).send('Forbidden: Only agents can access this route');
    }
    res.send('Welcome to the admin panel');
});

// Example of an admin route
router.get('/admin', verifyToken, (req, res) => {
  
});

export default router;