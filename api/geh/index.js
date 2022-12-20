/**
 * This is the error middleware file.
 * It send different message for dev and production
 */

// AppError
const AppError = require("../../utils/appError");

// Configs
const configs = require("../../configs");

// Error message for development
const errMessageForDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    erroStack: err.stack,
  });
};

// Error messafe for production
const errMessageForProduction = (err, res) => {
  if (err.isOprational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps! Unknown error happened. Please try again",
    });
  }
};

/**
 * The error handler middleware
 */
const geh = (err, req, res, next) => {
  err.status = err.status || "ERROR";
  err.statusCode = err.statusCode || 500;

  // Duplicate data error
  if (err.code === 11000) {
    err = new AppError("Duplicate record found.", 400);
  }

  // Casting error
  if (err.name === "CastError") {
    const message = `Resource not found`;
    err = new AppError(message, 404);
  }

  // JWT token error
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Please login", 401);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    err = new AppError("Please login", 401);
  }

  // Error in development
  if (configs.env === "development") {
    errMessageForDevelopment(err, res);
  }

  // Error in porduction
  if (configs.env == "production") {
    errMessageForProduction(err, res);
  }
};

// Export geh
module.exports = geh;
