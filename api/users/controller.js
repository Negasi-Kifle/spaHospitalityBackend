/**
 * This is the controller file of users.
 * It has all the methods that are bound to user routes
 */

// Users model
const Users = require("./model");

// AppError
const AppError = require("../../utils/appError");

/**
 * Create user
 */
exports.create = async (req, res, next) => {
  try {
    // Request body
    const data = req.body;

    // Set default password
    data.password = "abcspa@123";
    data.passwordConfirm = "abcspa@123";

    // Check "skill" is an array of services
    if (data.skills && !Array.isArray(data.skills))
      return next(new AppError("Skills must be an array", 400));

    // Create user
    const user = await Users.create({
      fullName: data.fullName,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      email: data.email,
      subcity: data.subcity,
      woreda: data.woreda,
      village: data.village,
      role: data.role,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      employementType: data.employementType,
      salaryType: data.salaryType,
      fixedSalaryAmount: data.fixedSalaryAmount,
      commissionAmount: data.commissionAmount,
      employementDate: data.employementDate,
    });

    // Response
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 */
exports.getAll = async (req, res, next) => {
  try {
    // Add filter options
    let filter = {};
    if (req.query) filter = req.query;

    // Get all users
    const users = await Users.find(filter).lean();

    // Response
    res.status(200).json({
      success: true,
      size: users.length,
      data: { users },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get one user by id
 */
exports.getById = async (req, res, next) => {
  try {
    // Get one user by id
    const user = await Users.findById(req.params.userId);

    // Response
    res.status(200).json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
