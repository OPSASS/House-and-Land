const mongoose = require('mongoose');

const UploadSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    postId: {
        type: String,
    },
    newId: {
        type: String,
    },
    files: [Object],
    profilePicture: [Object]
}, { timestamps: true });

const Upload = mongoose.model('Upload', UploadSchema);

module.exports.Upload = Upload;