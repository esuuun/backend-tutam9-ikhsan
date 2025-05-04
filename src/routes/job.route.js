const controller = require("../controllers/job.controller");
const express = require("express");
const router = express.Router();

router.post("/", controller.createJob);
router.get("/", controller.getAllUserJobs);
router.get("/:id", controller.getJobById);
router.patch("/:id", controller.updateJob);
router.delete("/:id", controller.deleteJob);

module.exports = router;
