/**
 * This the model for branches
 */

// Mongoose
const mongoose = require("mongoose");

// Branches schema
const branchesSchema = new mongoose.Schema(
  {
    branchName: {
      type: String,
      required: [true, "Branch name is required"],
      maxlength: [1, "Branch name must contain at least one character"],
      maxlength: [
        200,
        "Branch name should not contain more than 100 characters",
      ],
    },
    branchPhoneNumber: {
      type: String,
      maxlength: [13, "Phone number must have 13 digits"],
      maxlength: [13, "Phone number must have 13 digits"],
    },
    address: {
      type: String,
      required: [true, "Branch address is required"],
    },
    building: String,
    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Services",
      },
    ],
    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Inactive"],
        message: "Unknown status selected",
      },
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

// Create the branch model
const Branches = mongoose.model("Branches", branchesSchema);

// Export model
module.exports = Branches;
