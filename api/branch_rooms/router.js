/**
 * This file has all the routes of branch room
 */

// Router
const router = require("express").Router();

// Branch room controller
const roomController = require("./controller");

// Routes
router.route("/").post(roomController.create).get(roomController.getAll);

// Export router
module.exports = router;
