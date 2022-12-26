/**
 * Router file for users
 */

// Router
const router = require("express").Router();

// Users cntroller
const userController = require("./controller");

// Routes
router
  .route("/")
  .post(userController.create)
  .get(userController.getAll)
  .delete(userController.deleteAllOrMultipleUsers);

router
  .route("/:userId")
  .get(userController.getById)
  .delete(userController.deleteOneById);
// Export router
module.exports = router;
