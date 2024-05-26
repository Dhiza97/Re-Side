import jwt from 'jsonwebtoken';
import multer from 'multer';
import Agent from '../models/agentSchema.js';

export const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send('Invalid token');
    }
};


// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export { upload };

// Middleware to check if agent is logged in
export const checkIfAgentLoggedIn = (req, res, next) => {
    if (req.session.agent) {
        next();
    } else {
        res.redirect('/signin');
    }
};

// Middleware to check if user is logged in
export const ensureAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        req.flash('error_msg', 'Please log in to view dashboard');
        res.redirect('/signin');
    }
};