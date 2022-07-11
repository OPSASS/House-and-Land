const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

// AcceptPosts Schema
const ExpiredPostsSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    need: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        max: 99,
        required: true,
    },
    desc: {
        type: String,
        max: 3000,
        required: true,
    },
    loai: {
        type: String,
        required: true,
    },
    giay_to: {
        type: String,
    },
    so_phong_ngu: {
        type: String,
    },
    so_phong_tam: {
        type: String,
    },
    so_tang: {
        type: String,
    },
    city: {
        type: String,
    },
    district: {
        type: String,
    },
    ward: {
        type: String,
    },
    street: {
        type: String,
    },
    way: {
        type: String
    },
    area: {
        type: Number,
        required: true,
    },
    money: {
        type: Number,
    },
    currency: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    service: {
        type: String,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    seen: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
    },
    timepost: {
        type: String,
    },
}, { timestamps: true });
const ExpiredPosts = mongoose.model('ExpiredPosts', ExpiredPostsSchema);

module.exports.ExpiredPosts = ExpiredPosts