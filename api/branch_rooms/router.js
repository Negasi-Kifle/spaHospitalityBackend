/**
 * This file has all the routes of branch room
 */

// Router
const router = require("express").Router();

// Branch room controller
const roomController = require("./controller");

// Routes
router.route("/").post(roomController.create).get(roomController.getAll);

router
  .route("/:roomId")
  .get(roomController.getById)
  .patch(roomController.update);
// Export router
module.exports = router;
