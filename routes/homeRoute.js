import express from 'express'
import User from '../models/userSchema.js'
const router = express.Router()

router.get('/', (req, res) => {

    // Get user's first name from session (if available)
    const firstName = req.session.firstName || null

    // Render home.ejs
    res.render('home', { firstName } );
  });

  export default router