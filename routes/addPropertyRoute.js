import express from 'express'
import Property from '../models/propertySchema.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

// GET route to load add properties form
router.get('/', async (req, res) => {
    res.render('addProperty')
})

// POST route to add a new property
router.post('/', upload.array('photos'), async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded files:', req.files);

        // Extract property data from the request body
        const {
            propertyName,
            propertyType,
            purchaseType,
            address,
            city,
            state,
            zip,
            price,
            description,
            bedroom,
            bathroom,
            agentName,
            agentEmail,
            agentPhone
        } = req.body;

        // Extract uploaded photos
        const photos = req.files.map(file => file.path);

        // Create a new property
        const newProperty = new Property({
            propertyName,
            propertyType,
            purchaseType,
            address,
            city,
            state,
            zip,
            price,
            photos,
            description,
            bedroom,
            bathroom,
            agentName,
            agentEmail,
            agentPhone
        });

        // Save the new property to the database
        const savedProperty = await newProperty.save();

        // Redirect the user to the home page or any other appropriate page
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).send('Internal Server Error');
    }
})

export default router;