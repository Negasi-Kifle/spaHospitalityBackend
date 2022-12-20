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
