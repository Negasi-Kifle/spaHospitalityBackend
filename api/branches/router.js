/**
 * This is the router file for branch
 */

// Router
const router = require("express").Router();

// Branch controller
const branchController = require("./controller");

// Routes
router.route("/").post(branchController.create).get(branchController.getAll);

// Export router
module.exports = router;
