const mongoose = require('mongoose');

const Patient = require("../../patient_records/models/Patient");

const DiagnosticDocument = require("../models/DiagnosticDocumentModel");

const MedicalReportSchema = new mongoose.Schema({

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
        },

        /** SOAP format used to present and store medical report */

        /** SUBJECTIVE *******************************************/

        /** CC */
        chief_complaint: {
            type: String,
            required: true
        },

        /** HPI */
        condition_description: {
            type: String,
            required: false
        },

        condition_onset: {
            type: String,
            required: false
        },

        condition_duration: {
            type: String,
            required: false
        },

        alleviating_factors: [{
            type: String,
            required: false
        }],

        aggravating_factors: [{
            type: String,
            required: false
        }],


        /** Medical History */
        employment_activities: [{
            type: String,
            required: false
        }],

        chronic_diseases: [{
            type: String,
            required: false
        }],

        current_medications: [{
            type: String,
            required: false
        }],

        surgical_history: [{
            type: String,
            required: false
        }],

        /**  *****************************************************/




        /** OBJECTIVE ********************************************/

        // Vitals (prerecorded)
        blood_pressure: String,
        body_temperature: Number,
        heart_rate: Number,

        /** Visual Acuity ************/

        /** UNAIDED SNELLEN ***/
        snellen_test_unaided: {
            tested: { type: Boolean, default: true },
            right_eye: String,
            left_eye: String,
        },

        /** AIDED SNELLEN ***/
        snellen_test_aided: {
            tested: { type: Boolean, default: true },
            right_eye: String,
            left_eye: String,
        },

        /** Counting Finger */
        counting_finger: {
            tested: { type: Boolean, default: false },
            right_eye: {
                type: String,
                enum: ["CF-1", "CF-2", "CF-3"]
            },
            left_eye: {
                type: String,
                enum: ["CF-1", "CF-2", "CF-3"]
            },
        },

        /** Hand Motion */
        hand_motion: {
            tested: { type: Boolean, default: false },
            right_eye: String,
            left_eye: String,
        },

        /** Light Perception */
        light_perception: {
            tested: { type: Boolean, default: false },
            right_eye: String,
            left_eye: String,
        },
        /** End of Visual Acuity */


        /** Refraction Test */

        spherical_power: {
            tested: { type: Boolean, default: false },
            right_eye: Number,
            left_eye: Number,
        },

        cylindrical_power: {
            tested: { type: Boolean, default: false },
            right_eye: Number,
            left_eye: Number,
        },

        axes: {
            tested: { type: Boolean, default: false },
            right_eye: Number,
            left_eye: Number,
        },

        presbyopia_power: {
            tested: { type: Boolean, default: false },
            right_eye: Number,
            left_eye: Number,
        },

        /** End of Refraction */

        /** Pupillometry **********/
        pupil_diameter: {
            // pupil size in dim light conditions
            dim: {
                tested: { type: Boolean, default: false },
                right_eye: Number,
                left_eye: Number,
            },
            // pupil size in well lit conditions
            light: {
                tested: { type: Boolean, default: false },
                right_eye: Number,
                left_eye: Number,
            }
        },

        // Pupil Shape
        pupil_shape_accomodation: {
            tested: { type: Boolean, default: false },
            right_eye: String,
            left_eye: String,
        },

        // Direct reactivity to light
        direct_light_reactivity: {
            tested: { type: Boolean, default: false },
            right_eye: String,
            left_eye: String,
        },

        // Consensual reactivity to light
        consensual_light_reactivity: {
            tested: { type: Boolean, default: false },
            right_eye: String,
            left_eye: String,
        },

        /** End of Pupillometry */


        /** Confrontational Visual Fields */
        visual_fields_right: {
            tested: { type: Boolean, default: false },
            q1: Number,
            q2: Number,
            q3: Number,
            q4: Number,
        },

        visual_fields_left: {
            tested: { type: Boolean, default: false },
            q1: Number,
            q2: Number,
            q3: Number,
            q4: Number,
        },

        /** End of Visual Fields */

        /** Intraocular Pressure */
        intraocular_pressure: {
            tested: { type: Boolean, default: false },
            right_eye: Number,
            left_eye: Number,
        },

        /** End of IntraOcular Pressure */
        /** ******************************************************/

        /** Diagnostic Documents */

        diagnostics: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DiagnosticDocument',
            required: true,
        }],

        /** */
    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },

    });

module.exports = mongoose.model('MedicalReport', MedicalReportSchema);