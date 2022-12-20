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
      minLength: [1, "Branch name must contain at least one character"],
      maxLength: [
        200,
        "Branch name should not contain more than 100 characters",
      ],
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
