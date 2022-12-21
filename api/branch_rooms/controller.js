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
    // Find branch
    const branch = await Branches.findById(req.body.branch);

    // Check branch exists
    if (!branch) {
      return next(new AppError("Unkown branch selected"));
    }

    // Request body
    const data = req.body;

    /**
     * If branch has services and if no services are provided in the request body,
     * assign all branch services to the new room
     */
    if (branch.services && !data.services) data.services = branch.services;

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

/**
 * Get one room by id
 */
exports.getById = async (req, res, next) => {
  try {
    // Get room by id
    const room = await BranchRooms.findById(req.params.roomId);

    // Response
    res.status(200).json({
      success: true,
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};
