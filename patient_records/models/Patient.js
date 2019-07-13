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

    /*insurance_cover: {
        type: String,
        enum: ['None', 'Organization', 'Third Party'],
        required: true
    },

    insurance_provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsuranceProvider'
    },*/

    insurance_policy : {
        scheme : {
            type: String,
            enum: ['None', 'Organization', 'Third Party'],
            required: true,
	    default: 'None'
        }, 
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InsuranceProvider',
            required: function() {
                return this.insurance_policy.scheme !== 'None';
            }
        },
        policy_number: {
            type: String,
            required: function() {
                return this.insurance_policy.scheme !== 'None';
            }
        },
        maximum_cover: {
            type: Number,
            default: 0
        }
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

module.exports = mongoose.model('Patient', PatientSchema);
