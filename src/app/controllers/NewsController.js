const { News } = require('../models/admin/News');
const { Upload } = require('../models/upload');
const path = require('path');
class NewsControler {
    news = async(req, res, next) => {
        try {
            const filesArray = [];
            req.files.forEach(e => {
                const file = {
                    fileName: e.filename,
                    originalName: e.originalname,
                    path: e.path,
                    size: e.size,
                }
                filesArray.push(file);
            });

            const newPost = new News(req.body);
            const files = new Upload({
                newId: newPost._id,
                files: filesArray
            });
            await newPost.save();
            await files.save();
            res.redirect('/');
            console.log(newPost, files);
        } catch (error) {
            next(error);
        }
    }

    dangbao(req, res, next) {
        res.render('pages/news/newsPost', {
            title: 'Đăng báo',
        });
    }

    tnb(req, res, next) {
        res.render('pages/news/tin-noi-bat', {
            title: 'Tin nổi bật',
        });
    }

    tt(req, res, next) {
        res.render('pages/news/tin-tuc', {
            title: 'Tin tức',
        });
    }

    tv(req, res, next) {
        res.render('pages/news/tu-van', {
            title: 'Tư vấn',
        });
    }
}

module.exports = new NewsControler();