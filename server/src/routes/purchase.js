const express = require("express");
const router = express.Router();
const Purchase = require("../model/Purchase");

// Save new purchase
router.post("/save", async (req, res) => {
  const { userId, products } = req.body;
  try {
    const newPurchase = new Purchase({ userId, products });
    await newPurchase.save();
    res.status(201).json({ message: "Saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch user purchase history
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const data = await Purchase.find({ userId });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
