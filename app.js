import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files from the "public" directory
app.use(express.static('public'))

dotenv.config()

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

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
import addPropertyRoute from './routes/addPropertyRoute.js'

// Define routes
app.use('/', homeRoute);
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/signupagent', signupagentRoute);
app.use('/dashboard', dashboard);
app.use('/selectlog', selectlog);
app.use('/addproperty', addPropertyRoute);


const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})