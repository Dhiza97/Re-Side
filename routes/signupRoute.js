import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // Render signup.ejs
  res.render('signup');
});

export default router;