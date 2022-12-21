/**
 * This file has all the routes of branch room
 */

// Router
const router = require("express").Router();

// Branch room controller
const roomController = require("./controller");

// Routes
router
  .route("/")
  .post(roomController.create)
  .get(roomController.getAll)
  .delete(roomController.deleteAll);

router
  .route("/:roomId")
  .get(roomController.getById)
  .patch(roomController.update)
  .delete(roomController.deleteById);

router.delete(
  "/deleteroomsinbranch/:branchId",
  roomController.deleteRoomsInABranch
);

router.patch("/updatestatus/:roomId", roomController.updateStatus);
// Export router
module.exports = router;
