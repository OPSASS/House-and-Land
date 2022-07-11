const { User } = require('../models/User');
const { Posts } = require('../models/Posts');
const { Upload } = require('../models/upload');
const { Request } = require('../models/admin/Request');
const { ExpiredPosts } = require('../models/ExpiredPosts');
const bcrypt = require('bcrypt');


class UserController {
    index = async (req, res, next) => {
        if (req.isAuthenticated()) {
            const user = await User.findById(req.params.id);
            const avt =  await Upload.find({userId: user.id});
            const posts = await Posts.find({ userId: user._id }).sort({
                service: -1,
                createdAt: -1
            });
            const uploads = await Upload.find({});
            const expiredPosts = await ExpiredPosts.find({ userId: user._id }).sort({
                service: -1,
                createdAt: -1
            })
            const uploads2 = await Upload.find({ postId: expiredPosts.postId})
            res.render('pages/user/profile', {
                title: user.username,
                posts,
                uploads,
                expiredPosts,
                uploads2,
                avt
            })
            
        } else {
            res.redirect('/auth/login');
        }
    }

    get = async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            const { password, updatedAt, ...other } = user._doc;
            res.status(200).json(other);
        } catch (err) {
            next(err);
        }
    }

    update = async(req, res, next) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            if (req.body.password) {
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                } catch (err) {
                    next(err);
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.redirect('/user/' + req.params.id);
                console.log('user updated', user);
            } catch (err) {
                next(err);
            }
        } else {
            return res.status(403).json('Bạn không có quyền cập nhật thông tin tài khoản này');
        }
    }

    avts = async (req, res, next) => {
        if (req.body.userId === req.params.id || req.body.isAdmin) {
            try {
                const filesArray = [];
                const file = {
                    fileName: req.filename,
                    originalName: req.originalname,
                    path: req.path,
                    size: req.size,
                }
                filesArray.push(file);
                const files = new Upload({
                    files: filesArray
                });
                await files.save();
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                });
                res.redirect('/user/' + req.params.id);
                console.log('user updated', user);
            } catch (err) {
                next(err);
            }
        } else {
            return res.status(403).json('Bạn không có quyền cập nhật thông tin tài khoản này');
        }
    }


    delete = async(req, res, next) => {
        try {
            //check password
            const user = await User.findById(req.params.id);
            const isMatch = await bcrypt.compare(req.body.cpassword, user.password);
            if (isMatch) {
                const newRequest = new Request(req.body);
                await newRequest.save();
                res.redirect('/');
            } else {
                res.redirect('/user/' + req.params.id);
                console.log('Mật khẩu không đúng', user.password);
            }
        } catch (err) {
            next(err);
        }
    }
    delete2 = async(req, res, next) => {
        try {
            const newRequest = new Request(req.body);
            await newRequest.save();
            res.redirect('/');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UserController;