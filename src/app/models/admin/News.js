const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

// News Schema
const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        max: 199,
        required: true,
    },
    desc: {
        type: String,
        max: 9999,
        required: true,
    },
    loai: {
        type: String,
        required: true,
    },
    loaibai: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: 'title',
        unique: true,
    },
    by: {
        type: String,
    },
}, { timestamps: true });
const News = mongoose.model('News', NewsSchema);

module.exports.News = News;