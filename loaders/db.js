/**
 * This file for connecting the application with MongoDB
 */

// Mongoose
const mongoose = require("mongoose");

// Configs
const configs = require("../configs");

// Set srict query to false
mongoose.set("strictQuery", false);

// Connect to DB
mongoose
  .connect(configs.db.remote)
  .then((conn) => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to DB due to: ", err));

// DB connection instance
const dbConn = mongoose.connection;

// Listen for error
dbConn.on("error", (error) => {
  console.error("Error while connecting to DB: ", error);
});

// Listen when DB is disconnected
dbConn.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Export
module.exports = dbConn;
