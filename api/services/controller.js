/**
 * This is services controller file.
 */

// AppError
const AppError = require("../../utils/appError");

// service model
const Services = require("./model");

/**
 * Create service
 */
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
    const service = await Services.create({
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

/**
 * Get all services
 */
exports.getAll = async (req, res, next) => {
  try {
    // Get all services
    const services = await Services.find().lean();

    // Response
    res.status(200).json({
      success: true,
      size: services.length,
      data: { services },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a service by it id
 */
exports.getById = async (req, res, next) => {
  try {
    // Get service by id
    const service = await Services.findById(req.params.serviceId);

    //Response
    res.status(200).json({
      success: true,
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};
