// models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  SKU: {
    type: String,
    required: true,
    unique: true
  },
  StoreID: {
    type: String,
    required: true
  },
  ExpiryDate: {
    type: Date,
    required: true
  },
  stockName:{
    type:String,
    required:true
  },
  stockUrl:{
    type:String,
    required:true
  },
  StockQty: {
    type: Number,
    required: true
  },
  AvgDailySales: {
    type: Number,
    required: true
  },
  DaysRemaining: {
    type: Number // optional; can be calculated dynamically
  },
  RiskLevel: {
    type: String, // 'High', 'Medium', 'Low'
    enum: ["High", "Medium", "Low"]
  }
});

module.exports = mongoose.model("Product", productSchema);
