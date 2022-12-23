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

    // Create user
    const user = await Users.create({
      fullName: data.fullName,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
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
