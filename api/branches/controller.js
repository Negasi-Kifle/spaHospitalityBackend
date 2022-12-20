/**
 * This the controller file for branches where all
 * the methods that will be bound with a router
 */

// AppError
const AppError = require("../../utils/appError");

// Branches model
const Branches = require("./model");

/**
 * Create new branch
 */
exports.create = async (req, res, next) => {
  try {
    // Request body
    const {
      branchName,
      address,
      branchPhoneNumber,
      building,
      services,
      status,
    } = req.body;

    // Create admin
    const branch = await Branches.create({
      branchName,
      address,
      branchPhoneNumber,
      building,
      services,
      status,
    });

    // Response
    res.status(200).json({
      success: true,
      data: { branch },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all branches
 */
exports.getAll = async (req, res, next) => {
  try {
    // Get all branches
    const branches = await Branches.find().lean();

    // Response
    res.status(200).json({
      success: true,
      data: { branches },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get one branch by id
 */
exports.getById = async (req, res, next) => {
  try {
    // Find branch
    const branch = await Branches.findById(req.params.branchId);

    // Response
    res.status(200).json({
      success: true,
      data: { branch },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete one branch by id
 */
exports.deleteById = async (req, res, next) => {
  try {
    // Delete branch
    await Branches.findByIdAndDelete(req.params.branchId);

    // Response
    res.status(200).json({
      success: true,
      message: "Branch deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete all branches
 */
exports.deleteAll = async (req, res, next) => {
  try {
    // Delete all
    await Branches.deleteMany();

    // Response
    res.status(200).json({
      success: true,
      message: "All branches deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update branch detail.
 */
exports.update = async (req, res, next) => {
  try {
    // If branch not found, send error
    if (!(await Branches.findById(req.params.branchId))) {
      return next(new AppError("Branch not found", 400));
    }

    // Request body
    const {
      branchName,
      address,
      branchPhoneNumber,
      building,
      services,
      status,
    } = req.body;

    // Update branch
    const branch = await Branches.findByIdAndUpdate(req.params.branchId, {
      branchName,
      branchPhoneNumber,
      address,
      building,
      services,
      status,
    });

    // Response
    res.status(200).json({
      success: true,
      message: "Branch updated successfully",
      data: { branch },
    });
  } catch (error) {
    next(error);
  }
};
