const express = require("express");
const router = express.Router();
const { Review, Item } = require("../../db/models");

// GET all reviews by itemId
router.post("/items", async (req, res) => {
  try {
    const { itemIds } = req.body;
    const reviews = await Review.findAll({
      where: {
        itemId: itemIds,
      },
    });

    // Group reviews by itemId
    const reviewsByItem = reviews.reduce((acc, review) => {
      if (!acc[review.itemId]) {
        acc[review.itemId] = [];
      }
      acc[review.itemId].push(review);
      return acc;
    }, {});

    res.json(reviewsByItem);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

// POST a new review
router.post("/", async (req, res) => {
  try {
    const { userId, itemId, rating, content } = req.body;

    // Check if user has already reviewed this item
    const existingReview = await Review.findOne({ where: { userId, itemId } });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this item" });
    }

    const newReview = await Review.create({ userId, itemId, rating, content });

    // Update the item's rating
    const item = await Item.findByPk(itemId);
    if (item) {
      item.stars += rating;
      item.numRatings += 1;
      await item.save();
    }

    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT (edit) a review
router.put("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, content } = req.body;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.update({ rating, content });
    res.json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE a review
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    await review.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
