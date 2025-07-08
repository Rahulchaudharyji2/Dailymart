const express = require("express");
const router = express.Router();
const { getPredictions, createProduct, getHighRiskProducts } = require("../controller/inventoryController");

router.get("/", getPredictions);
router.post("/add", createProduct);
router.get("/high-risk", getHighRiskProducts);

module.exports = router;
