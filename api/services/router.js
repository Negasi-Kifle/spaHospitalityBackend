/**
 * This is router file for services
 */

// Router
const router = require("express").Router();

// Service controller
const serviceController = require("./controller");

// Routes
router
  .route("/")
  .post(serviceController.create)
  .get(serviceController.getAll)
  .delete(serviceController.deleteAll);

router
  .route("/:serviceId")
  .get(serviceController.getById)
  .patch(serviceController.update)
  .delete(serviceController.deleteOneById);

router.patch("/updatestatus/:serviceId", serviceController.updateStatus);
// Export
module.exports = router;
