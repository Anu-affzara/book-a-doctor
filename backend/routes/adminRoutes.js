const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');

// Fetch all doctors
router.get('/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

// Fetch all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// PUT route for updating doctor details
router.put('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialty } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(id, { name, specialty }, { new: true });
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({ message: 'Error updating doctor', error });
  }
});

// DELETE route for deleting a doctor
router.delete('/doctors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    await Appointment.deleteMany({ doctorId: id }); // Delete associated appointments
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({ message: 'Error deleting doctor', error });
  }
});

module.exports = router;

