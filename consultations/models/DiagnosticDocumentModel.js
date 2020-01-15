const mongoose = require('mongoose');

const DiagnosticDocumentSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    path: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("DiagnosticDocument", DiagnosticDocumentSchema);