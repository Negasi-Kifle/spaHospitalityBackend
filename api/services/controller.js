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
    const data = req.body;

    // Calculate price after vat
    data.priceAfterVAT =
      data.priceBeforeVAT + (data.priceBeforeVAT * data.serviceVAT) / 100;

    // Create service
    const service = await Services.create({
      serviceName: data.serviceName,
      serviceDuration: data.serviceDuration,
      serviceVAT: data.serviceVAT,
      priceAfterVAT: data.priceAfterVAT,
      priceBeforeVAT: data.priceBeforeVAT,
      commission: data.commission,
      description: data.description,
      status: data.status,
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

/**
 * Update service detail
 */
exports.update = async (req, res, next) => {
  try {
    // If service doesnot exist, throw an error
    if (!(await Services.findById(req.params.serviceId))) {
      return next(new AppError("Service not found", 400));
    }

    // Request body
    const data = req.body;

    // Calculate price after vat
    data.priceAfterVAT =
      data.priceBeforeVAT + (data.priceBeforeVAT * data.serviceVAT) / 100;

    // Update service
    const service = await Services.findByIdAndUpdate(
      req.params.serviceId,
      {
        serviceName: data.serviceName,
        serviceDuration: data.serviceDuration,
        serviceVAT: data.serviceVAT,
        priceAfterVAT: data.priceAfterVAT,
        priceBeforeVAT: data.priceBeforeVAT,
        commission: data.commission,
        description: data.description,
        status: data.status,
      },
      { runValidators: true, new: true }
    );

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
 * Delete one service by id
 */
exports.deleteOneById = async (req, res, next) => {
  try {
    // Delete service
    await Services.findByIdAndDelete(req.params.serviceId);

    // Response
    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete all services in DB
 */
exports.deleteAll = async (req, res, next) => {
  try {
    // Delete all
    await Services.deleteMany();

    // Response
    res.status(200).json({
      success: true,
      message: "All services in DB has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
