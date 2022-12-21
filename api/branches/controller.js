/**
 * This the controller file for branches where all
 * the methods that will be bound with a router
 */

// AppError
const AppError = require("../../utils/appError");

// Branches model
const Branches = require("./model");

// Branch rooms
const BranchRooms = require("../branch_rooms/model");

/**
 * Create new branch
 */
exports.create = async (req, res, next) => {
  try {
    // Request body
    const data = req.body;

    // Create admin
    const branch = await Branches.create({
      branchName: data.branchName,
      address: data.address,
      branchPhoneNumber: data.branchPhoneNumber,
      building: data.building,
      services: data.services,
      status: data.status,
      description: data.description,
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
      size: branches.length,
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

    // Cascade all branch rooms
    await BranchRooms.deleteMany({ branch: req.params.branchId });

    // Response
    res.status(200).json({
      success: true,
      message: "Branch and rooms of the branch are deleted successfully",
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

    // Delete all rooms
    await BranchRooms.deleteMany();

    // Response
    res.status(200).json({
      success: true,
      message: "All branches in DB has been deleted successfully",
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
    const data = req.body;

    // Update branch
    const branch = await Branches.findByIdAndUpdate(
      req.params.branchId,
      {
        branchName: data.branchName,
        branchPhoneNumber: data.branchPhoneNumber,
        address: data.address,
        building: data.building,
        services: data.services,
        status: data.status,
        description: data.description,
      },
      { runValidators: true, new: true }
    );

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

/**
 * Update branch status
 */
exports.updateStatus = async (req, res, next) => {
  try {
    // If branch does not exist, throw error
    if (!(await Branches.findById(req.params.branchId))) {
      return next(new AppError("Branch not found", 400));
    }

    // Update branch
    const branch = await Branches.findByIdAndUpdate(
      req.params.branchId,
      {
        status: req.body.status,
      },
      { runValidators: true, new: true }
    );

    // Response
    res.status(200).json({
      success: true,
      data: { branch },
    });
  } catch (error) {
    next(error);
  }
};
