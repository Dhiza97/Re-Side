import express from 'express'
import Agent from '../models/agentSchema.js'

const router = express.Router()

router.get('/', (req, res) => {

    console.log(req.session.firstName)

    const firstName = req.session.firstName;
    res.render('dashboard', { firstName });
});

export default router