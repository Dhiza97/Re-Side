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


// Middleware to store agent details in session
// export const storeAgentDetailsInSession = async (req, res, next) => {
//     try {
//         const agentEmail = req.agentEmail; // Assuming you have the agent's email from authentication
//         const agent = await Agent.findOne({ email: agentEmail });
//         if (agent) {
//             // Store agent details in session
//             req.session.agent = agent;
//             req.session.firstName = agent.firstName;
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// };


// Middleware to check if agent is logged in
export const checkIfAgentLoggedIn = (req, res, next) => {
    if (req.session.agent) {
        next();
    } else {
        res.redirect('/signin');
    }
};