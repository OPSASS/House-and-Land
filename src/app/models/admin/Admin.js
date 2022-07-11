const mongoose = require('mongoose');

// Admin Schema
const AdminSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 30,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    cpassword: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);
module.exports.Admin = Admin;