const mongoose = require('mongoose');

const Patient = require("../../patient_records/models/Patient");
const Bill = require('../../billings/models/BillingsModel');
const InsuranceProvider = require("./InsuranceProvider");

const InsuranceClaimSchema = new mongoose.Schema({

        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
        },

        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InsuranceProvider',
            required: true,
        },

        bill: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bill',
            required: true,
        },

        bill_array: [{
            description: String,
            quantity: Number,
            per_unit_cost: Number,
            sub_total: Number,
        }],

        status: {
            type: String,
            enum: ['PENDING', 'PROCESSED', 'PAID'],
            default: 'PENDING'
        }

    },

    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
    });

module.exports = mongoose.model('InsuranceClaim', InsuranceClaimSchema);