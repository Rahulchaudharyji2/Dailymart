const express = require("express");
const app = express();
const cors = require('cors')
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}));
// ⏲️ Cron Job
const runInventoryUpdater = require("./src/cron/updateInventory");
runInventoryUpdater();

// 🚚 Routes
const inventoryRoutes = require("./src/routes/inventoryRoutes");
const purchaseRoutes = require("./src/routes/purchase");  // ✅ Smart Cart route
const smartCartRoutes = require("./src/routes/smartCartRoutes");
app.use("/smart-cart", smartCartRoutes);

// 🧠 Mount Routes
app.use("/predict", inventoryRoutes);
app.use("/purchase", purchaseRoutes);  // ✅ Smart cart APIs

// 🔥 Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ errMsg: message });
});

module.exports = app;
