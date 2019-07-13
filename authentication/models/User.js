const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true
    },

    admin: {
        type: Boolean,
        default: false
    },
},

{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model('User', UserSchema);