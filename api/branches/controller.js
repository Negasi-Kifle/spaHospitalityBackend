/**
 * This the controller file for branches where all
 * the methods that will be bound with a router
 */

// AppError
const AppError = require("../../utils/appError");

// Branches model
const Branches = require("./model");

// Create branch
exports.create = async (req, res, next) => {
  try {
    // Request body
    const { branchName, address, building, services, status } = req.body;

    // Create admin
    const branch = await Branches.create({
      branchName,
      address,
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

// Get all branches
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

// Get one branch by id
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

// Delete by id
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

// Delete all
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
