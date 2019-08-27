const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        required: true
    },

    other_names: {
        type: String,
        required: true
    },

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

    role: {
        type: String,
        required: true
    },

    profile_url: {
        type: String,
        required: false
    },

},

{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
    
    toObject: {virtuals: true},
    toJSON: {virtuals: true},
    
});

UserSchema.virtual('full_name').get(function() {
     return this.first_name + " " + this.other_names
});

module.exports = mongoose.model('User', UserSchema);
