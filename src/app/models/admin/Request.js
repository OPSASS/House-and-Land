const mongoose = require('mongoose');

const RequestSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avt: {
        type: String,
    },
    other: {
        type: String,
    },
    agree: {
        type: String,
    },
    cpassword: {
        type: String,
    },
}, { timestamps: true });

const Request = mongoose.model('Request', RequestSchema);

module.exports.Request = Request;