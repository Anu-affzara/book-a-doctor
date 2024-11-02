const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const sampleDoctors = require('../data/doctors.json');

// Fetch all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
});

// Add sample doctors data
router.post('/addSample', async (req, res) => {
  try {
    const newDoctor = new Doctor({
      name: req.body.name,
      specialty: req.body.specialty
    });
    await newDoctor.save();
    res.status(201).json({ message: 'Doctor added', newDoctor });
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ message: 'Error adding doctor', error });
  }
});

// Update doctor details
router.put('/:id', async (req, res) => {
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

// Delete a doctor
router.delete('/:id', async (req, res) => {
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
