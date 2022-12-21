/**
 * This is the model for employees
 */

// Mongoose
const mongoose = require("mongoose");

// Validator
const validator = require("validator");

// Bcrypt
const bcrypt = require("bcryptjs");

// Employees
const usersSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "First name is required"],
      maxlegnth: [100, "First name can not contain more than 100 characters"],
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["Female", "Male"],
        message: "Unknown gender type selected",
      },
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is requried"],
      minlength: [13, "Phone number must contain 13 digits only"],
      maxlength: [13, "Phone number must contain 13 digits only"],
    },
    address: String,
    subcity: String,
    woreda: String,
    village: String,
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: [
          "SuperAdmin",
          "Admin",
          "Receptionist",
          "Therapist",
          "Janitor",
          "Security",
        ],
        message: "Unkown role selected",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must contain at least 8 characters"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password confirm is required"],
      validate: {
        validator: function (value) {
          return this.password === value;
        },
        message: "Password and Password Confirm must be the same",
      },
    },
    passwordResetToken: String,
    passwordResetTokenExpire: Date,
    passwordChangedAt: Date,
    status: {
      type: String,
      enum: {
        values: ["Active", "Inactive"],
        message: "Unknown status selected",
      },
      default: "Active",
    },
    firstTimeLogin: {
      type: Boolean,
      enum: {
        values: [true, false],
        message: "Unknown first time login status",
      },
      default: true,
    },
    employementType: {
      type: String,
      required: [true, "Employment type is requried"],
      enum: {
        values: ["Permanent", "Contractual"],
        message: "Unknown emolyment type selected",
      },
    },
    salaryType: {
      type: String,
      required: [true, "Salary type is required"],
      enum: {
        values: [
          "Fixed",
          "Fixed + Commision",
          "Fixed + Commission + Bonus",
          "Bonus",
        ],
        message: "Unknown salary type selected",
      },
    },
    fixedSalaryAmount: Number,
    commissionAmount: Number,
    employmentDate: {
      type: Date,
      required: [true, "Employment date is required"],
    },
    avatar: String,
    skills: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Services",
      },
    ],
    emergencyContact: {
      type: mongoose.Schema.ObjectId,
      ref: "EmergencyContacts",
    },
    guarantorDetail: {
      type: mongoose.Schema.ObjectId,
      ref: "Guarantors",
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
    },
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Hash user password before saving the document
usersSchema.pre("save", async function (next) {
  // If password of the document is not modified, go to the next middleware
  if (!this.isModified("password")) return next();

  // Else hash the password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// Employes model
const Employees = mongoose.model("Employees", usersSchema);

// Export model
module.exports = Employees;
