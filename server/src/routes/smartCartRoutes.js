const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  // Dummy logic
  return res.json({ recommended: ["Tomato", "Milk", "Bread"] });
});

module.exports = router;
