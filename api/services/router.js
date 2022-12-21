/**
 * This is router file for services
 */

// Router
const router = require("express").Router();

// Service controller
const serviceController = require("./controller");

// Routes
router.route("/").post(serviceController.create).get(serviceController.getAll);

router
  .route("/:serviceId")
  .get(serviceController.getById)
  .patch(serviceController.update);
// Export
module.exports = router;
