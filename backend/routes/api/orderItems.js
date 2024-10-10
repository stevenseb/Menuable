// routes/api/orderItems.js
const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { OrderItem, Item } = require("../../db/models");

// POST create new order items
router.post("/", requireAuth, async (req, res) => {
  const { orderId, items } = req.body;

  try {
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const dbItem = await Item.findByPk(item.id);
        return OrderItem.create({
          orderId,
          itemId: dbItem.id,
          quantity: item.quantity,
          units: dbItem.units,
          measure: dbItem.measure,
          pricePerUnit: dbItem.price,
          costPerUnit: dbItem.costPerUnit,
        });
      })
    );

    res.status(201).json({ orderItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
