const mongoose = require('mongoose');
const Patient = require("../../patient_records/models/Patient");

const PatientQueueSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        unique: true,
        dropDups: true,
        required: true,
    },

    blood_pressure: {
        type: String,
        required: true
    },

    body_temperature: {
        type: Number,
        required: true
    },

    heart_rate: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model('PatientQueue', PatientQueueSchema);