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
     * assign all branch services to the new room by default
     */
    if (branch.services && !data.services) data.services = branch.services;

    // Create room
    const branchRoom = await BranchRooms.create({
      roomName: data.roomName,
      branch: data.branch,
      services: data.services,
      status: data.status,
      description: data.description,
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
    const branchRooms = await BranchRooms.find()
      .lean()
      .populate({ path: "branch", select: "branchName" })
      .populate({ path: "services", select: "serviceName" });

    // Response
    res.status(200).json({
      success: true,
      siza: branchRooms.length,
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
    const room = await BranchRooms.findById(req.params.roomId)
      .lean()
      .populate({ path: "branch", select: "branchName" })
      .populate({ path: "services", select: "serviceName" });

    // Response
    res.status(200).json({
      success: true,
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update branch room
 */
exports.update = async (req, res, next) => {
  try {
    // Check room exists in DB
    if (!(await BranchRooms.findById(req.params.roomId))) {
      return next(new AppError("Room not found", 400));
    }

    // Find branch
    const branch = await Branches.findById(req.body.branch);

    // Check branch exists
    if (!branch) return next(new AppError("Branch does not exist"));

    // Request body
    const data = req.body;

    /**
     * If branch has services and if no services are provided in the request body,
     * assign all branch services to the new room by default
     */
    if (branch.services && !data.services) data.services = branch.services;

    // Update room
    const room = await BranchRooms.findByIdAndUpdate(
      req.params.roomId,
      {
        roomName: data.roomName,
        branch: data.branch,
        services: data.services,
        status: data.status,
        description: data.description,
      },
      { new: true, runValidators: true }
    );

    // Response
    res.status(200).json({
      success: true,
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete room by id
 */
exports.deleteById = async (req, res, next) => {
  try {
    // Delete room
    await BranchRooms.findByIdAndDelete(req.params.roomId);

    // Response
    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete all rooms in a branch
 */
exports.deleteRoomsInABranch = async (req, res, next) => {
  try {
    const branch = await Branches.findById(req.params.branchId);

    // Delete rooms in a branch
    await BranchRooms.deleteMany({ branch: req.params.branchId });

    // Response
    res.status(200).json({
      success: true,
      message: `All rooms in a branch ${branch.branchName} have been deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete all rooms in all branches
 */
exports.deleteAll = async (req, res, next) => {
  try {
    // Delete all rooms
    await BranchRooms.deleteMany();

    // Response
    res.status(200).json({
      success: true,
      message: "All rooms in all branches have been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update room status
 */
exports.updateStatus = async (req, res, next) => {
  try {
    // Check if room exists
    if (!(await BranchRooms.findById(req.params.roomId))) {
      return next(new AppError("Room not found", 400));
    }

    // Update room status
    const room = await BranchRooms.findByIdAndUpdate(
      req.params.roomId,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    // Response
    res.status(200).json({
      success: true,
      data: { room },
    });
  } catch (error) {
    next(error);
  }
};
