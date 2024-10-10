const express = require("express");
const router = express.Router();
const { Item } = require("../../db/models");

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "units",
        "measure",
        "numRatings",
        "stars",
        "quantityOnHand",
        "imageFilename",
        "onMenu",
      ],
    });

    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET all items for current menu (onMenu=true)
router.get("/menu", async (req, res) => {
  try {
    const items = await Item.findAll({
      where: { onMenu: true },
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "units",
        "measure",
        "numRatings",
        "stars",
        "quantityOnHand",
        "imageFilename",
        "onMenu",
      ],
    });

    res.json({ items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET item by itemId
router.get("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await Item.findByPk(itemId, {
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "units",
        "measure",
        "numRatings",
        "stars",
        "quantityOnHand",
        "imageFilename",
        "onMenu",
      ],
    });

    if (item) {
      res.json({ item });
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST a new item
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      units,
      measure,
      quantityOnHand,
      costPerUnit,
      onMenu,
      imageFilename,
    } = req.body;

    const newItem = await Item.create({
      name,
      description,
      price,
      units,
      measure,
      quantityOnHand,
      costPerUnit,
      onMenu,
      imageFilename,
    });

    res.status(201).json({ item: newItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH an item's quantityOnHand

router.patch("/update-quantities", async (req, res) => {
  try {
    const { items } = req.body;
    const itemsArray = Array.isArray(items) ? items : [items];

    const updatedItems = await Promise.all(
      itemsArray.map(async (item) => {
        const dbItem = await Item.findByPk(item.id);
        if (!dbItem) {
          throw new Error(`Item with id ${item.id} not found`);
        }
        dbItem.quantityOnHand = item.quantityOnHand;
        await dbItem.save();
        return dbItem;
      })
    );

    res.json({ items: updatedItems });
  } catch (error) {
    console.error("Error updating item quantities:", error);
    res.status(500).json({ message: "Failed to update item quantities" });
  }
});

// PATCH an item (general update)
router.patch("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const updateData = req.body;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Ensure quantityOnHand is not null or undefined
    if (
      updateData.quantityOnHand !== undefined &&
      updateData.quantityOnHand !== null
    ) {
      updateData.quantityOnHand = parseInt(updateData.quantityOnHand, 10);
    } else {
      delete updateData.quantityOnHand; // Remove it from updateData if it's null or undefined
    }

    // Update the item with all provided fields
    await item.update(updateData);

    res.json({ item });
  } catch (error) {
    console.error("Error updating item:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// PATCH an item's onMenu status
router.patch("/:itemId/onMenu", async (req, res) => {
  const { itemId } = req.params;
  const { onMenu } = req.body;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.onMenu = onMenu;
    await item.save();

    res.json({ item });
  } catch (error) {
    console.error("Error updating item onMenu status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PATCH an item's quantityOnHand
router.patch("/:itemId/quantity", async (req, res) => {
  const { itemId } = req.params;
  const { quantityOnHand } = req.body;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantityOnHand = quantityOnHand;
    await item.save();

    res.json({ item });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE an item
router.delete("/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findByPk(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await item.destroy();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
