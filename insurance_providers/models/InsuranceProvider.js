
const mongoose = require('mongoose');

const InsuranceProviderSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: ['Organization', 'Third Party'],
        required: true
    },

    phone: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('InsuranceProvider', InsuranceProviderSchema);