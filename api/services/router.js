/**
 * This is router file for services
 */

// Router
const router = require("express").Router();

// Service controller
const serviceController = require("./controller");

// Routes
router.route("/").post(serviceController.create);

// Export
module.exports = router;
