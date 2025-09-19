const Appointment = require("../models/Appointment");

// Create 
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All 
exports.getAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .populate("doctor_id", "name specialization")
    .populate("patient_id", "name age");
  const restructured = appointments.map((appointment) => ({
    _id: appointment._id,
    doctor_id: appointment.doctor_id,
    patient_id: appointment.patient_id,
    date: appointment.date.toISOString().split("T")[0],
    time: appointment.date.toISOString().split("T")[1].substring(0, 5),
  }));
  res.json(restructured);
};

// Get by ID
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctor_id", "name specialization")
      .populate("patient_id", "name age");
    if (!appointment) return res.status(404).json({ message: "Not found" });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update 
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete 
exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
