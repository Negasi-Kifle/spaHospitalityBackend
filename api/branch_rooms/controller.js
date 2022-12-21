/**
 * This controller file has all the methods for branch rooms endpoints
 */

// Branch rooms model
const BranchRooms = require("./model");

// Branches model
const Branches = require("../branches/model");

// AppError
const AppError = require("../../utils/appError");

/**
 * Create branch room
 */
exports.create = async (req, res, next) => {
  try {
    // Request body
    const data = req.body;

    // Check branch exists
    if (!(await Branches.findById(data.branch))) {
      return next(new AppError("Unkown branch selected"));
    }

    // Create room
    const branchRoom = await BranchRooms.create({
      roomName: data.roomName,
      branch: data.branch,
      services: data.services,
    });

    // Response
    res.status(200).json({
      success: true,
      data: { branchRoom },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all branch rooms
 */
exports.getAll = async (req, res, next) => {
  try {
    // Get all
    const branchRooms = await BranchRooms.find().lean();

    // Response
    res.status(200).json({
      success: true,
      data: { branchRooms },
    });
  } catch (error) {
    next(error);
  }
};
