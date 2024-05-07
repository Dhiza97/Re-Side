import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // Render signin.ejs
  res.render('signin');
});

export default router;