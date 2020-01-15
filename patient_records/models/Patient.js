const mongoose = require('mongoose');

const InsuranceProvider = require("../../insurance_providers/models/InsuranceProvider");

const PatientSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    family_name: {
        type: String,
        required: true
    },

/*
    patient_id: {
        type: String,
        required: false,
    },*/

    date_of_birth: {
        type: Date,
        required: true,
    },

    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },
    
    email: {
       type: String 
    },

    occupation: {
        type: String,
        required: true
    },
    
    company: {
        type: String,
    },

    residential_address: {
	type: String,
	required: true
    },

    date_of_first_visit: {
        type: Date,
        required: true,
        default: Date.now()
    },


    insurance_policy : {

        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InsuranceProvider',
            required: false,
        },

        policy_number: {
            type: String,
            required: false,
        },

        maximum_cover: {
            type: Number,
            default: 0,
            required: false,
        },

        policy_start: {
            type: Date,
            required: false,
        },

        policy_end: {
            type: Date,
            required: false,
        },

    }
},

{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },

   toObject: {virtuals: true},
   toJSON: {virtuals: true},
});

// define a virtual for patient's full name and age

PatientSchema.virtual('full_name').get(function(){
     return this.first_name + " " + this.family_name
});


PatientSchema.virtual('patient_id').get(function(){
     return this.id.slice(-4) + '/' +
        this.created_at.getFullYear().toString().slice(-2);
});

module.exports = mongoose.model('Patient', PatientSchema);
