const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');
const { requireAuth } = require('../../utils/auth');
const { Item, ItemImage } = require('../../db/models');


// ########### NEED TO PROTECT THESE ROUTES AND ROUTES IN USERS FROM UNAUTHORIZED ACCESS #########
// TODO ****************************************************

// GET itemImage by itemId
router.get('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  try {
    const itemImage = await ItemImage.findOne({
      where: { itemId },
      attributes: ['itemId', 'url']
    });

    if (!itemImage) {
      return res.status(404).json({ message: 'ItemImage not found' });
    }

    res.json({ itemImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST edit itemImage by itemId
router.post('/:itemId', requireAuth, async (req, res) => {
  const { itemId } = req.params;
  const { url } = req.body;

  try {
    const itemImage = await ItemImage.findOne({
      where: { itemId }
    });

    if (!itemImage) {
      return res.status(404).json({ message: 'ItemImage not found' });
    }

    // Check if the item belongs to the authenticated user (optional, based on your auth logic)
    // const item = await Item.findByPk(itemId);
    // if (item.userId !== req.user.id) {
    //   return res.status(403).json({ message: 'Forbidden' });
    // }

    itemImage.url = url || itemImage.url;
    await itemImage.save();

    res.json({ itemImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE itemImage by itemId
router.delete('/:itemId', requireAuth, async (req, res) => {
  const { itemId } = req.params;

  try {
    const itemImage = await ItemImage.findOne({
      where: { itemId }
    });

    if (!itemImage) {
      return res.status(404).json({ message: 'ItemImage not found' });
    }

    await itemImage.destroy();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
