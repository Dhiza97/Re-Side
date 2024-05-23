import express from 'express';
import Property from '../models/propertySchema.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// GET route to load the edit property form
router.get('/:id/edit', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).send('Property not found');
        }
        res.render('editProperty', { property });
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to update a property
router.post('/:id/edit', upload.array('photos'), async (req, res) => {
    try {
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

        // Get existing and removed photos
        const existingPhotos = req.body.existingPhotos || [];
        const removedPhotos = req.body.removedPhotos ? req.body.removedPhotos.split(',').map(Number) : [];

        // Filter out removed photos
        const updatedPhotos = existingPhotos.filter((_, index) => !removedPhotos.includes(index));

        // Add new uploaded photos
        const newPhotos = req.files.map(file => file.path);
        const allPhotos = [...updatedPhotos, ...newPhotos];

        const updatedProperty = {
            propertyName,
            propertyType,
            purchaseType,
            address,
            city,
            state,
            zip,
            price,
            photos: allPhotos,
            description,
            bedroom,
            bathroom,
            agentName,
            agentEmail,
            agentPhone
        };

        await Property.findByIdAndUpdate(req.params.id, updatedProperty);

        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).send('Internal Server Error');
    }
});

// POST route to delete a property
router.post('/:id/delete', async (req, res) => {
    try {
        await Property.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;