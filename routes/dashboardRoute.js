import express from 'express'
// import { storeAgentDetailsInSession } from '../middleware/authMiddleware.js';
import Agent from '../models/agentSchema.js'

const router = express.Router()

// Apply middleware to store agent details in session
// router.use(storeAgentDetailsInSession);

router.get('/', (req, res) => {

    // Access agent details from session
    const agent = req.session.agent;

    // Get user's first name from session (if available)
    const firstName = req.session.firstName || null

    // Render dashboard.ejs with agent details
    res.render('dashboard', { agent, firstName })
});

export default router