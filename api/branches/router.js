/**
 * This is the router file for branch
 */

// Router
const router = require("express").Router();

// Branch controller
const branchController = require("./controller");

// Routes
router
  .route("/")
  .post(branchController.create)
  .get(branchController.getAll)
  .delete(branchController.deleteAll);

router
  .route("/:branchId")
  .get(branchController.getById)
  .delete(branchController.deleteById)
  .patch(branchController.update);

router.patch("/updatestatus/:branchId", branchController.updateStatus);
// Export router
module.exports = router;
