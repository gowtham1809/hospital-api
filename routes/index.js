const express = require("express");
const hospitalRoutes = require("./hospitalRoutes");
const doctorRoutes = require("./doctorRoutes");
const patientRoutes = require("./patientRoutes");
const appointmentRoutes = require("./appointmentRoutes");

const router = express.Router();

router.use("/hospitals", hospitalRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);

module.exports = router;
