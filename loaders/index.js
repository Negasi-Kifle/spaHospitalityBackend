/**
 * This file is for starting the server using
 * the "http" module and "app.js" file.
 */

// Configs
const configs = require("../configs");

// App
const app = require("./app");

// DB
const dbConn = require("./db");

// Http
const http = require("http");

// Start the server and export it
module.exports = () => {
  // Create server from the http module
  const server = http.createServer(app);

  // Listen on a given port
  server.listen(
    configs.port,
    console.log("Server Listening on port ", configs.port)
  );

  // Majestic close
  process.on("SIGINT", () => {
    // Close the server
    server.close(console.log("Server is closed..."));

    // Close the DB
    dbConn.close(console.log("MongoDB is disconnected"));
  });
};
