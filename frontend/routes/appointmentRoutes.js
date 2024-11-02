const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Route for booking an appointment
router.post('/', async (req, res) => {
  try {
    const { doctorId, date, time, patientName } = req.body;
    const newAppointment = new Appointment({ doctorId, date, time, patientName });
    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully!', newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Error booking appointment', error });
  }
});

module.exports = router;


// Fetch all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('doctorId');
    console.log(appointments); // Log appointments to ensure they are populated
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Update appointment status
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, date, time } = req.body;
    const updatedFields = { status };
    if (date) updatedFields.date = date;
    if (time) updatedFields.time = time;
    const appointment = await Appointment.findByIdAndUpdate(id, updatedFields, { new: true });
    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

// Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Error deleting appointment' });
  }
});

module.exports = router;
