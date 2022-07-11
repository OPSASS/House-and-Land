const mongoose = require('mongoose');

// Service Schema
const ServiceSchema = mongoose.Schema({
    svType: {
        type: String,
        require: true,
    },
    svName: {
        type: String,
        require: true,
    },
    svPrice: {
        type: Number,
        required: true,
    },
    svNum: {
        type: Number,
        required: true,
    },
    svTime: {
        type: Number,
        required: true,
    },
    svDesc: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Service = mongoose.model('Service', ServiceSchema);
module.exports.Service = Service;