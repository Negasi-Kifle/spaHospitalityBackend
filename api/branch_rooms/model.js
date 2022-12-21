/**
 * This is a model for branch rooms - rooms in a branch.
 */

// Mongoose
const mongoose = require("mongoose");

// Rooms schema
const branchRoomsSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: [true, "Branch room name is required"],
    },
    branch: {
      type: mongoose.Schema.ObjectId,
      ref: "Branches",
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Services",
      },
    ],
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

// Branch rooms model
const BranchRooms = mongoose.model("BranchRooms", branchRoomsSchema);

// Export model
module.exports = BranchRooms;
