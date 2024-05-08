import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    // Render dashboard.ejs
    res.render('dashboard');
});

export default router