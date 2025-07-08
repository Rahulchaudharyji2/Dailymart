const express = require("express");
const router = express.Router();
const { getPredictions, createProduct } = require("../controller/inventoryController");

router.get("/", getPredictions);
router.post("/add", createProduct);

module.exports = router;
