const mongoose = require('mongoose');

const Patient = require("../../patient_records/models/Patient");

const User = require("../../authentication/models/User");

const BillSchema = new mongoose.Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },

    bill_number: {
        type: String,
        required: true
    },

    authorized_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    payment_status: {

        paid: {
            type: Boolean,
            default: false,
        },

        payment_at: {
            type: Date,
            required: false,
        },

        received_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false,
        },

        amount_paid: {
            type: Number,
            required: false
        },

        payment_method: {
            type: String,
            enum: ['Cash', 'MoMo', 'Cheque'],
            default: 'Cash'
        },

        momo_payment: {
            account_name: {
                type: String,
                required: false,
            },
            momo_number: {
                type: String,
                required: false,
            },
            txn_id: {
                type: String,
                required: false
            }
        },

        cheque_payment: {
            issuing_bank: {
                type: String,
                required: false
            },

            account_number: {
                type: String,
                required: false
            },

            cheque_number: {
                type: String,
                required: false
            },

            date_on_cheque: {
                type: Date,
                required: false
            }
        }
    },

    bill_array: [{
        description: String,
        quantity: Number,
        per_unit_cost: Number,
        sub_total: Number,
        covered_by_insurance: Boolean
    }]


}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', BillSchema);