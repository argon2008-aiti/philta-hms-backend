
const mongoose = require('mongoose');

const InsuranceProviderSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },

    insurer_type: {
        type: String,
        enum: ['Organization', 'ThirdParty'],
        required: true
    },

    phone_number: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    logo_url: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('InsuranceProvider', InsuranceProviderSchema);
