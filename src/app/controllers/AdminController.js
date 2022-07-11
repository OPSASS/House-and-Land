const { Admin } = require('../models/admin/Admin');
const { Service } = require('../models/admin/Service');
const { Posts } = require('../models/Posts')
const { AcceptPosts } = require('../models/admin/AcceptPosts')
const { Upload } = require('../models/upload');
const { User } = require('../models/User');
const { Request } = require('../models/admin/Request');
const bcrypt = require('bcrypt');
const passport = require('passport');

class AdminController {
    // GET /
    index(req, res, next) {
        res.render('admin/home/home', {
            title: 'Trang quản trị'
        });
    }

    // GET /login
    login(req, res, next) {
        res.render('admin/login/login', {
            title: 'Đăng nhập'
        });
    }

    // GET /users
    users = async(req, res, next) => {
        const users = await User.find({});
        const newus = users.filter(user => user.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000));

        res.render('admin/users/users', {
            title: 'Quản lý người dùng',
            users,
            newus
        });
    }

    // GET /posts
    posts(req, res, next) {
        AcceptPosts.find({}).sort({
                service: -1,
                createdAt: -1
            })
            .then(acceptPosts => {
                Upload.find({}, (err, uploads) => {
                    if (err) {
                        console.log(err);
                    } else {
                        Posts.find({}).sort({
                                service: -1,
                                createdAt: -1
                            })
                            .then(posts => {
                                Upload.find({}, (err, uploads2) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('admin/posts/posts', {
                                            title: 'Quản lý bài đăng',
                                            acceptPosts,
                                            uploads,
                                            posts,
                                            uploads2
                                        });
                                    }
                                    console.log(uploads2, posts);
                                });
                            }).catch(err => next(err));
                    }
                });
            })
            .catch(err => next(err));
    }

    // GET /posts/view/:id
    viewPost(req, res, next) {
        AcceptPosts.findById(req.params.id)
            .then(posts => {
                if (!posts) {
                    res.render('pages/404/404', {
                        title: '404'
                    });
                } else {
                    Upload.find({ postId: posts.id }, (err, uploads) => {
                        if (err) {
                            next(err);
                        } else {
                            res.render('admin/posts/view-posts', {
                                title: posts.title,
                                posts,
                                uploads
                            });
                        }
                        console.log(uploads, posts);
                    });
                }
            })
            .catch(next);
    }

    // POST /posts/:id/accept
    accept(req, res, next) {
        AcceptPosts.findById(req.params.id).sort({
                service: -1,
                createdAt: -1
            })
            .then(posts => {
                Posts.create({
                        postId: posts.id,
                        userId: posts.userId,
                        name: posts.name,
                        email: posts.email,
                        phone: posts.phone,
                        address: posts.address,
                        need: posts.need,
                        title: posts.title,
                        desc: posts.desc,
                        loai: posts.loai,
                        giay_to: posts.giay_to,
                        so_phong_ngu: posts.so_phong_ngu,
                        so_phong_tam: posts.so_phong_tam,
                        so_tang: posts.so_tang,
                        city: posts.city,
                        district: posts.district,
                        ward: posts.ward,
                        street: posts.street,
                        way: posts.way,
                        area: posts.area,
                        money: posts.money,
                        currency: posts.currency,
                        profilePicture: posts.profilePicture,
                        service: posts.service,
                        slug: posts.slug,
                        seen: posts.seen,
                        status: posts.status,
                        timepost: posts.timepost,
                        createdAt: posts.createdAt,
                        updatedAt: posts.updatedAt,
                    })
                    .then(post => {
                        AcceptPosts.findByIdAndDelete(req.params.id)
                            .then(() => {
                                res.redirect('/admin/posts');
                            })
                            .catch(err => next(err));
                    })
                    .catch(err => next(err));
            })
            .catch(err => next(err));
    }

    // DELETE /posts/:id
    deletePost(req, res, next) {
        AcceptPosts.findByIdAndDelete(req.params.id)
            .then(() => {
                res.redirect('/admin/posts');
            })
            .catch(err => next(err));
    }


    // GET /posts/:id
    postsUser = async(req, res, next) => {
            const users = await User.findById(req.params.id);
            const posts = await Posts.find({ userId: users._id }).sort({
                service: -1,
                createdAt: -1
            })
            const uploads = await Upload.find({});
            res.render('admin/posts/posts-user', {
                title: "Bài viết của " + users.username,
                users,
                posts,
                uploads,
            });
            console.log(users, posts, uploads);
        }
        // GET /chat
    chat(req, res, next) {
            res.render('admin/chat/chat', {
                title: 'Tin nhắn'
            });
        }
        // GET /chart
    chart = async(req, res, next) => {
            const users = await User.find({});
            const posts = await Posts.find({});
            const newus = users.filter(user => user.createdAt > new Date(Date.now() - 24 * 60 * 60 * 1000));

            res.render('admin/chart/chart', {
                title: 'Biểu đồ thống kê',
                users,
                posts,
                newus
            });
        }
        // GET /feedback
    feedback = async(req, res, next) => {
            try {
                const requests = await Request.find({}).sort({ createdAt: -1 });
                res.render('admin/feedback/feedback', {
                    title: 'Phản hồi',
                    requests
                });
            } catch (error) {
                next(error);
            }
        }
        // POST /feedback/:id
    deleteFeedback = async(req, res, next) => {
        try {
            const request = await Request.findByIdAndRemove(req.params.id);
            res.redirect('/admin/feedback');
        } catch (error) {
            next(error);
        }
    }

    // POST /login
    loginProcess = async(req, res, next) => {
        passport.authenticate('admin', {
            successRedirect: '/admin',
            failureRedirect: '/admin/login',
            failureFlash: true
        })(req, res, next);
    }

    // DELETE /users/:id
    deleteUser = async(req, res, next) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            const posts = await Posts.find({ userId: user._id });
            const files = await File.find({ postId: posts.id });
            const content = await File.find({ postId: files.id });
            
            files.forEach(async(file) => {
                await file.delete();
            });
            posts.forEach(async(post) => {
                await post.remove();
            });
            res.redirect('/admin/users');
        } catch (err) {
            next(err);
        }
    }

    // ++++++++ SERVICE +++++++++
    // GET /service
    service = async(req, res) => {
        const services = await Service.find({})
        res.render('admin/service/service', {
            title: 'Gói dịch vụ',
            services
        });
        console.log(services);
    }

    // POST /service
    postService = async(req, res, next) => {
            try {
                const Newervice = new Service(req.body);
                await Newervice.save();
                res.redirect('/admin/service');
            } catch (err) {
                next(err);
            }
        }
        // DELETE /service/:id
    deleteService = async(req, res, next) => {
            try {
                await Service.findByIdAndDelete(req.params.id);
                res.redirect('/admin/service');
            } catch (err) {
                next(err);
            }
        }
        // GET /service/:id/edit
    editService = async(req, res) => {
        const service = await Service.findById(req.params.id);
        res.render('admin/service/edit-service', {
            title: 'Sửa gói dịch vụ',
            service
        });
    }

    // PUT /service/:id
    updateService = async(req, res, next) => {
        try {
            const service = await Service.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/admin/service');
        } catch (err) {
            next(err);
        }
    }

    // GET /come-back
    comeBack (req, res, next) {
        res.render('admin/prevent/prevent', {
            title: 'Không được phép truy cập vào đường link này!',
        });
    }
}

module.exports = new AdminController;