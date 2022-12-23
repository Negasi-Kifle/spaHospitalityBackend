/**
 * This file is for initializing the express app, utilizing middlewares,
 * and mounting endpoints with route files
 */

// Express
const express = require("express");

// Global error handler
const geh = require("../api/geh");

// Router files
const branchRouter = require("../api/branches/router");
const serviceRouter = require("../api/services/router");
const roomRouter = require("../api/branch_rooms/router");
const userRouter = require("../api/users/router");

// Initialize express
const app = express();

// Request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mount endpoints with router files
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/branchrooms", roomRouter);
app.use("/api/v1/users", userRouter);

// Use the global error handler middleware
app.use(geh);

// Export
module.exports = app;
