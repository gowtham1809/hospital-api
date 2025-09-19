const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

exports.createHospital = async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getHospitals = async (req, res) => {
  const hospitals = await Hospital.find();
  res.json(hospitals);
};

exports.getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).lean();
    const doctors = await Doctor.find({ hospital_id: hospital._id }).lean();
    if (!hospital) return res.status(404).json({ message: 'Not found' });
    res.json({ ...hospital, doctors });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteHospital = async (req, res) => {
  try {
    await Hospital.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
