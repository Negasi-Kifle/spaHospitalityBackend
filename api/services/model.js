/**
 * This file is for services model
 */

// Mongoose
const mongoose = require("mongoose");

// Services model
const servicesSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: [true, "Service name is required"],
    },
    serviceDuration: Number,
    priceBeforeVAT: {
      type: Number,
      required: [true, "Service price before VAT is required"],
    },
    serviceVAT: Number,
    priceAfterVAT: {
      type: Number,
      required: [true, "Service price after VAT is required"],
    },
    commission: Number,
    description: String,
    status: {
      type: String,
      default: "Active",
      enum: {
        values: ["Active", "Inactive"],
        message: "Unknown status",
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

// Model
const Services = mongoose.model("Services", servicesSchema);

// Export model
module.exports = Services;
