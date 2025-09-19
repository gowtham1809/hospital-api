const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// Create
exports.createPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All
exports.getPatients = async (req, res) => {
  const patients = await Patient.find().populate(
    "hospital_id",
    "name location"
  );
  res.json(patients);
};

// Get by ID
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("hospital_id", "name")
      .lean();
    const appointments = await Appointment.find({
      patient_id: patient._id,
    }).lean();
    const doctorIds = appointments.map((app) => app.doctor_id);
    const doctors = await Doctor.find({ _id: { $in: doctorIds } }).lean();

    const updatedAppointments = appointments.map((app) => {
      app.doctor = doctors.find(
        (d) => d._id.toString() === app.doctor_id.toString()
      )?.name;
      return app;
    });
    if (!patient) return res.status(404).json({ message: "Not found" });
    res.json({
      ...patient,
      hospital: {
        name: patient.hospital_id?.name,
        _id: patient.hospital_id?._id,
      },
      appointments: updatedAppointments,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deletePatient = async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
