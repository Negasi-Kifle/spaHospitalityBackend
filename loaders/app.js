/**
 * This file is for initializing the express app, utilizing middlewares,
 * and mounting endpoints with route files
 */

// Express
const express = require("express");

// Global error handler
const geh = require("../api/geh");

// Initialize express
const app = express();

// Use the global error handler middleware
app.use(geh);

// Export
module.exports = app;
