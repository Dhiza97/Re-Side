import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config()

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('E don connect to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))





const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})