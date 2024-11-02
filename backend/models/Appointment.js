const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor' },
  patientName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
