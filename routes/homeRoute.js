import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    // Render home.ejs
    res.render('home');
  });

  export default router