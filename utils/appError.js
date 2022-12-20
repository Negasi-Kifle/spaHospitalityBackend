/**
 * This file is for creating custom error messages with error/status code.
 * It has one constructor function.
 * And it will always be used as an argument whenever we to send error message
 */

const AppError = function (message, statusCode) {
  Error.call(this, message);
  this.message = message;
  this.statusCode = statusCode;
  this.status = `${this.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
  this.isOperational = false;

  // Send error stack trace for debug
  Error.captureStackTrace(this, this.constructor);
};

// Export
module.exports = AppError;
