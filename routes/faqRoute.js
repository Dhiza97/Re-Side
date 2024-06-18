import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    const firstName = req.session.firstName || null;

    res.render('faq', {firstName})
})

export default router