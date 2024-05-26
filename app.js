import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files from the "public" directory
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));

dotenv.config()

// Set up session middleware with MongoStore
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_CONNECTION_STRING,
        ttl: 10 * 60, // 10 minutes
        autoRemove: 'native' // Default behavior
    }),
    cookie: {
        maxAge: 10 * 60 * 1000 // 10 minutes
    }
}));

app.use(flash());

// Middleware to reset session timer on activity
app.use((req, res, next) => {
    if (req.session) {
        req.session._garbage = Date();
        req.session.touch();
    }
    next();
});

// Middleware to make flash messages available in templates
// Middleware to make flash messages available in templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Database Connection
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('E don connect to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// Import route handlers
import homeRoute from './routes/homeRoute.js';
import signupRoute from './routes/signupRoute.js';
import signinRoute from './routes/signinRoute.js';
import signupagentRoute from './routes/signupagentRoute.js'
import dashboard from './routes/dashboardRoute.js'
import selectlog from './routes/selectlogRoute.js'
import addProperty from './routes/addPropertyRoute.js'
import editPropertyRoute from './routes/editPropertyRoute.js';
import viewPropertyRoute from './routes/viewPropertiesRoute.js';
import propertyDetailsRoute from './routes/propertyDetailsRoute.js';
import logoutRoute from './routes/logoutRoute.js'

// Define routes
app.use('/', homeRoute);
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/signupagent', signupagentRoute);
app.use('/dashboard', dashboard);
app.use('/selectlog', selectlog);
app.use('/add', addProperty);
app.use('/property', editPropertyRoute);
app.use('/viewproperties', viewPropertyRoute)
app.use('/propertydetails', propertyDetailsRoute)
app.use('/logout', logoutRoute);


const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})