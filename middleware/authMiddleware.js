import jwt from 'jsonwebtoken';
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

// Authentication middleware function
// export const authenticateAgent = async (req, res, next) => {
//     const { email, password } = req.body;

//     try {
//         const agent = await Agent.findOne({ email });
//         if (!agent) {
//             return res.render('signin', { errorMessage: 'Invalid email or password' });
//         }

//         const isPasswordValid = await bcrypt.compare(password, agent.password);
//         if (!isPasswordValid) {
//             return res.render('signin', { errorMessage: 'Invalid email or password' });
//         }

//         req.agentEmail = agent.email;
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