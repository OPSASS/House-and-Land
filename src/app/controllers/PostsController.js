const { Posts } = require('../models/Posts');
const { AcceptPosts } = require('../models/admin/AcceptPosts');
const { User } = require('../models/User');
const { Upload } = require('../models/upload');
const { Service } = require('../models/admin/Service');
const { ExpiredPosts } = require('../models/ExpiredPosts');
const fs = require('fs');
const subVn = require('sub-vn');



class PostsControler {
    // render page post
    // GET /posts/dang-tin-bds
    index = async(req, res) => {
        const services = await Service.find();
        res.render('pages/post/dang-tin-bds', {
            title: 'Đăng tin',
            services
        });
    }

    // upload img post
    // POST /posts/upload
    upload = async(req, res, next) => {
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
            const newPost = new AcceptPosts(req.body);
            const files = new Upload({
                postId: newPost._id,
                files: filesArray
            });
            await newPost.save();
            await files.save();
            res.redirect('/posts/dang-tin-thanh-cong');
            console.log(newPost, files); // show post
        } catch (error) {
            next(error);
        }
    }

    // render page post success
    // GET /posts/dang-tin-thanh-cong
    success = async(req, res) => {
        res.render('pages/post/dang-tin-thanh-cong', {
            title: 'Đăng tin thành công'
        });
    }

    // edit post
    // GET /posts/:id/edit
    edit = async(req, res, next) => {
        try {
            const post = await Posts.findById(req.params.id);
            res.render('pages/post/edit-tin', {
                title: 'Sửa tin',
                post,
            });
        } catch (error) {
            next(error);
        }
    }




    // update post
    // PUT /posts/:id
    update = async(req, res, next) => {
        try {
            const post = await Posts.findByIdAndUpdate(req.params.id, req.body);
            res.redirect('/mua-ban-bds/' + post.slug);
        } catch (error) {
            next(error);
        }
    }




    // delete post
    // DELETE /posts/:id
    delete = async(req, res, next) => {
        try {
            const post = await Posts.findByIdAndDelete(req.params.id);
            const files = await Upload.find({ postId: post._id });
            console.log('Post deleted!');
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }

    // delete post delay
    // GET /posts/:id/delete/delay
    deleteDelay = async(req, res, next) => {
        const post = await Posts.findById(req.params.id);
        const timeout = setTimeout(() => {
            post.delete();
            console.log('Post deleted!');
        }, 10000); // 1 minute
        res.redirect('/');
    }

    // soft delete
    // POST /posts/:id/softDelete
    softDelete = async(req, res, next) => {
        const now = new Date().getTime();
        const post = await Posts.findById(req.params.id);
        if ( new Date(post.timepost).getTime() <= now ) {
            Posts.findById(req.params.id)
            .then(posts => {
                ExpiredPosts.create({
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
                    Posts.findByIdAndDelete(req.params.id)
                        .then(() => {
                            res.redirect('/');
                        })
                        .catch(err => next(err));
                })
                .catch(err => next(err));
            })
            .catch(err => next(err));
        }}

            



    // search post
    // GET /posts/search
    search = async(req, res, next) => {
        try {
            const key = req.query.q;
            const area = req.query.area;
            const city = req.query.city;
            const money = req.query.money;
            const moneys = [
                { money: 0, name: 'Thỏa thuận', slug: 'thoa-thuan', value: null },
                { money: 1, name: 'Dưới 500 triệu', slug: 'duoi-500-trieu', value: { $lt: 500000000 } },
                { money: 2, name: 'Từ 500 triệu đến 1 tỷ', slug: 'tu-500-trieu-den-1-ty', value: { $gt: 500000000, $lt: 1000000000 } },
                { money: 3, name: 'Từ 1 tỷ đến 2 tỷ', slug: 'tu-1-ty-den-2-ty', value: { $gt: 1000000000, $lt: 2000000000 } },
                { money: 4, name: 'Từ 2 tỷ đến 3 tỷ', slug: 'tu-2-ty-den-3-ty', value: { $gt: 2000000000, $lt: 3000000000 } },
                { money: 5, name: 'Từ 3 tỷ đến 5 tỷ', slug: 'tu-3-ty-den-5-ty', value: { $gt: 3000000000, $lt: 5000000000 } },
                { money: 6, name: 'Từ 5 tỷ đến 7 tỷ', slug: 'tu-5-ty-den-7-ty', value: { $gt: 5000000000, $lt: 7000000000 } },
                { money: 7, name: 'Từ 7 tỷ đến 10 tỷ', slug: 'tu-7-ty-den-10-ty', value: { $gt: 7000000000, $lt: 10000000000 } },
                { money: 8, name: 'Trên 10 tỷ', slug: 'tren-10-ty', value: { $lt: 10000000000 } },
            ]

            const areas = [
                { area: 1, name: 'Dưới 30m²', slug: 'duoi-30m2', value: { $lt: 30 } },
                { area: 2, name: 'Từ 30m² đến 50m²', slug: '30m2-50m2', value: { $gt: 30, $lt: 50 } },
                { area: 3, name: 'Từ 50m² đến 80m²', slug: '50m2-80m2', value: { $gt: 50, $lt: 80 } },
                { area: 4, name: 'Từ 80m² đến 120m²', slug: '80m2-120m2', value: { $gt: 80, $lt: 120 } },
                { area: 5, name: 'Từ 120m² đến 200m²', slug: '120m2-200m2', value: { $gt: 120, $lt: 200 } },
                { area: 6, name: 'Từ 200m² đến 300m²', slug: '200m2-300m2', value: { $gt: 200, $lt: 300 } },
                { area: 7, name: 'Trên 300m²', slug: 'tren-300m2', value: { $gt: 300 } },
            ]

            // filter area in areas
            const areasFilter = areas.filter(e => {
                return e.area == area;
            });

            // filter money in moneys
            const moneysFilter = moneys.filter(e => {
                return e.money == money;
            });

            // console.log(areasFilter[0].name);

            const all = await Posts.find({}).sort({
                service: -1,
                createdAt: -1
            });
            const uploads = await Upload.find({});
            if (area == null && money == null) {
                const data = await Posts.find({
                    $or: [
                        { title: { $regex: key, $options: 'i' } },
                        { content: { $regex: key, $options: 'i' } },
                    ],
                    $and: [
                        city ? { city: city } : {},
                    ]
                }).sort({
                    service: -1,
                    createdAt: -1
                });
                res.render('pages/search/search', {
                    title: 'Tìm kiếm',
                    all: all,
                    uploads: uploads,
                    data: data,
                    key: key,
                });
            } else if (area == null && money != null) {
                const data = await Posts.find({
                    $or: [
                        { title: { $regex: key, $options: 'i' } },
                        { content: { $regex: key, $options: 'i' } },
                    ],
                    $and: [
                        city ? { city: city } : {},
                        { money: moneysFilter[0].value },
                    ]
                }).sort({
                    service: -1,
                    createdAt: -1
                });
                res.render('pages/search/search', {
                    title: 'Tìm kiếm',
                    all: all,
                    uploads: uploads,
                    data: data,
                    key: key,
                });
            } else if (area != null && money == null) {
                const data = await Posts.find({
                    $or: [
                        { title: { $regex: key, $options: 'i' } },
                        { content: { $regex: key, $options: 'i' } },
                    ],
                    $and: [
                        city ? { city: city } : {},
                        { area: areasFilter[0].value },
                    ]
                }).sort({
                    service: -1,
                    createdAt: -1
                });
                res.render('pages/search/search', {
                    title: 'Tìm kiếm',
                    all: all,
                    uploads: uploads,
                    data: data,
                    key: key,
                });
            } else {
                const data = await Posts.find({
                    $or: [
                        { title: { $regex: key, $options: 'i' } },
                        { content: { $regex: key, $options: 'i' } },
                    ],
                    $and: [
                        city ? { city: city } : {},
                        { area: areasFilter[0].value },
                        { money: moneysFilter[0].value },
                    ]
                }).sort({
                    service: -1,
                    createdAt: -1
                });
                res.render('pages/search/search', {
                    title: 'Tìm kiếm',
                    all: all,
                    uploads: uploads,
                    data: data,
                    key: key,
                });
            }
        } catch (err) {
            next(err);
        }
    }

    //render page
    // GET /posts/tin-dang-ban
    sell = async(req, res) => {
        const posts = await Posts.find().sort({
            service: -1,
            createdAt: -1
        });
        const uploads = await Upload.find({});
        res.render('pages/post/tin-dang-ban', {
            title: 'Tin đang bán',
            posts,
            uploads
        });
        console.log(posts, uploads);
    }


    //GET /posts/tin-cho-thue
    rent = async(req, res) => {
        const posts = await Posts.find().sort({
            service: -1,
            createdAt: -1
        });
        const uploads = await Upload.find({});
        res.render('pages/post/tin-cho-thue', {
            title: 'Tin cho thuê',
            posts,
            uploads
        });
        console.log(posts, uploads);
    }

    //GET /posts/tin-sang-nhuong
    transfers = async(req, res) => {
        const posts = await Posts.find().sort({
            service: -1,
            createdAt: -1
        });
        const uploads = await Upload.find({});
        res.render('pages/post/tin-sang-nhuong', {
            title: 'Tin sang nhượng',
            posts,
            uploads
        });
        console.log(posts, uploads);
    }
}
module.exports = new PostsControler();