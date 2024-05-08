import express from 'express'

const router = express()

router.get('/', (req, res) => {
    // Render selectLog.ejs
    res.render('selectLog');
});

export default router