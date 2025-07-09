const express = require("express");
const app = express();
app.use(express.json());
const runInventoryUpdater = require("./src/cron/updateInventory");
runInventoryUpdater();
// Error Handler

const inventoryRoutes = require("./src/routes/inventoryRoutes");
app.use("/predict", inventoryRoutes);

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ errMsg: message });
});

module.exports = app;