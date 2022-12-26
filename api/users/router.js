/**
 * Router file for users
 */

// Router
const router = require("express").Router();

// Users cntroller
const userController = require("./controller");

// Routes
router.route("/").post(userController.create).get(userController.getAll);

router.route("/:userId").get(userController.getById);
// Export router
module.exports = router;
