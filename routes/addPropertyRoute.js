import express from 'express'

const router = express()

router.get('/', (req, res) => {
    // Render Add Property Page
    res.render('addProperty');
})

export default router;