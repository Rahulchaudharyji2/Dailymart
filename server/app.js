const express = require("express");
const app = express();

// Error Handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ errMsg: message });
});

module.exports = app;
