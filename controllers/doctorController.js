const Doctor = require("../models/Doctor");
const Hospital = require("../models/Hospital");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");

// Create
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
exports.getDoctors = async (req, res) => {
  const doctors = await Doctor.find().populate("hospital_id", "name location");
  res.json(doctors);
};

// Get by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate("hospital_id", "name")
      .lean();
    const hospital = await Hospital.findById(doctor.hospital_id).lean();
    const appointments = await Appointment.find({
      doctor_id: doctor._id,
    }).lean();
    const patientIds = appointments.map((app) => app.patient_id);
    const patients = await Patient.find({ _id: { $in: patientIds } }).lean();

    const updatedAppointments = appointments.map((app) => {
      app.patient = patients.find(
        (p) => p._id.toString() === app.patient_id.toString()
      )?.name;
      return app;
    });

    if (!doctor) return res.status(404).json({ message: "Not found" });
    res.json({
      ...doctor,
      hospital,
      appointments: updatedAppointments,
      patients,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
