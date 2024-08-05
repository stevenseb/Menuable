const express = require('express');
const router = express.Router();
const { Item } = require('../../db/models');

// GET all items
router.get('/', async (req, res) => {
    try {
        const items = await Item.findAll({
            attributes: [
                'id',
                'name', 
                'description', 
                'price', 
                'quantity', 
                'measure', 
                'numRatings', 
                'stars',
                'quantityOnHand',
                'imageFilename'
            ]
        });

        res.json({ items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET all items for current menu (onMenu=true)
router.get('/menu', async (req, res) => {
    try {
        const items = await Item.findAll({
            where: { onMenu: true },
            attributes: [
                'id',
                'name', 
                'description', 
                'price', 
                'quantity', 
                'measure', 
                'numRatings', 
                'stars',
                'quantityOnHand',
                'imageFilename'
            ]
        });

        res.json({ items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET item by itemId
router.get('/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
        const item = await Item.findByPk(itemId, {
            attributes: [
                'id',
                'name', 
                'description', 
                'price', 
                'quantity', 
                'measure', 
                'numRatings', 
                'stars',
                'quantityOnHand',
                'imageFilename'
            ]
        });

        if (item) {
            res.json({ item });
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
