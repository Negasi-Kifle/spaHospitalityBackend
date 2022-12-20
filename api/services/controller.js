/**
 * This is services controller file.
 */

// AppError
const AppError = require("../../utils/appError");

// service model
const Service = require("./model");

// Create
exports.create = async (req, res, next) => {
  try {
    // Request body
    let {
      serviceName,
      serviceDuration,
      priceBeforeVAT,
      serviceVAT,
      priceAfterVAT,
      commission,
      description,
      status,
    } = req.body;

    // Calculate price after vat
    priceAfterVAT = priceBeforeVAT + (priceBeforeVAT * serviceVAT) / 100;

    // Create service
    const service = await Service.create({
      serviceName,
      serviceDuration,
      serviceVAT,
      priceAfterVAT,
      priceBeforeVAT,
      commission,
      description,
      status,
    });

    // Response
    res.status(200).json({
      success: true,
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};
