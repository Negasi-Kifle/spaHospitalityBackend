/**
 * This file is for holding environmental variables
 */

// Dotenv
require("dotenv").config();

// Object for storing all the variables
module.exports = {
  env: process.env.NODE_ENV,
  db: {
    remote: process.env.REMOTE_DB,
  },
  port: process.env.PORT,
};
