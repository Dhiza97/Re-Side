import express from 'express';
import FAQ from '../models/faqSchema.js';
import { ensureAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get all FAQs
router.get('/', async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.render('faq', { faqs, user: req.session.user });
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to add a new FAQ (you might want to restrict this to admin users)
router.post('/', ensureAuthenticated, async (req, res) => {
    const { question, answer } = req.body;

    try {
        const newFAQ = new FAQ({ question, answer });
        await newFAQ.save();
        req.flash('success_msg', 'FAQ added successfully');
        res.redirect('/faq');
    } catch (error) {
        console.error('Error adding FAQ:', error);
        req.flash('error_msg', 'An error occurred while adding FAQ');
        res.redirect('/faq');
    }
});

export default router;