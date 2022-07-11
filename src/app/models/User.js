const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
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
    coverPicture: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        require: true,
        min: 2,
        max: 30,
    },
    phone: {
        type: Number,
        require: true,
    },
    idtex: {
        type: Number,
        require: true,
    },
    city: {
        type: String,
        require: true,
    },
    district: {
        type: String,
        require: true,
    },
    ward: {
        type: String,
        require: true,
    },
    street: {
        type: String,
    },
    sex: {
        type: String,
        require: true,
    },
    birthday: {
        type: Date,
    },
    type: {
        type: String,
        require: true,
    },
    googleId: {
        type: String
    },
    facebookId: {
        type: String
    },
    twitterId: {
        type: String
    },
    postType: {
        type: String,
    },
    package: {
        type: String,
        require: true,
    },
    nameCard: {
        type: String,
    },
    numCard: {
        type: String,
    },
    dateCard: {
        type: String,
    },
    postDate: {
        type: String,
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports.User = User;