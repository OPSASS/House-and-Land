const { Posts } = require('../models/Posts')
const { Upload } = require('../models/upload');
const subVn = require('sub-vn');
const cities = subVn.getProvinces();

class SiteController {
    // GET /
    index = async (req, res, next) => {
        Posts.find({}).sort({
                service: -1,
                createdAt: -1
            })
            .then(posts => {
                Upload.find({}, (err, uploads) => {
                    if (err) {
                        next(err);
                    } else {
                        res.render('pages/home/index', {
                            title: 'Trang chủ',
                            posts,
                            uploads,
                            cities
                        });
                    }
                });
                const now = new Date().getTime();
                const post = Posts.findById(req.params.id);
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
                    })
                    .catch(err => next(err));
                }
            })
        }
    

    ipost(req, res, next) {
        res.render('pages/post/mua-ban-bds', {
            title: 'Mua bán bất động sản',
        });
    }

    post(req, res, next) {
        Posts.findOne({ slug: req.params.slug })
            .then(posts => {
                if (!posts) {
                    res.render('pages/404/404', {
                        title: '404'
                    });
                } else {
                    Upload.find({ postId: posts.postId }, (err, uploads) => {
                        if (err) {
                            next(err);
                        } else {
                            res.render('pages/post/single-post', {
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
    // GET /du-an/dang-khoi-cong/:slug
    duan = async (req, res, next) => {
        const posts = await Posts.find({});
        res.render('pages/project-citys/du-an', {
            title: 'Dự án',
            posts
        });
    }

    mbn = async(req, res, next) => {
        const posts = await Posts.find({});
        const uploads = await Upload.find({});
        res.render('pages/site/mua_ban/mua-ban-nha', {
            title: 'Mua bán nhà',
            posts,
            uploads
        });
    }

    mnmp(req, res, next) {
        res.render('pages/site/mua_ban/mua-nha-mat-pho', {
            title: 'Mua nhà mặt phố',
        });
    }

    mchcc(req, res, next) {
        res.render('pages/site/mua_ban/mua-can-ho-chung-cu', {
            title: 'Mua căn hộ chung cư',
        });
    }

    mchv(req, res, next) {
        res.render('pages/site/mua_ban/mua-can-ho-villa', {
            title: 'Mua căn hộ, villa',
        });
    }

    mkns(req, res, next) {
        res.render('pages/site/mua_ban/mua-kho-nha-suong', {
            title: 'Mua kho, nhà sưởng',
        });
    }

    mmb(req, res, next) {
        res.render('pages/site/mua_ban/mua-mat-bang', {
            title: 'Mua mặt bằng',
        });
    }


    tchcc(req, res, next) {
        res.render('pages/site/cho_thue/thue-can-ho-chung-cu', {
            title: 'Thuê căn hộ chung cư',
        });
    }

    tmb(req, res, next) {
        res.render('pages/site/cho_thue/thue-mat-bang', {
            title: 'Thuê mặt bằng',
        });
    }


    tvp(req, res, next) {
        res.render('pages/site/cho_thue/thue-van-phong', {
            title: 'Thuê văn phòng',
        });
    }


    tnt(req, res, next) {
        res.render('pages/site/cho_thue/thue-nha-tro', {
            title: 'Thuê nhà trọ',
        });
    }


    tch(req, res, next) {
        res.render('pages/site/cho_thue/thue-cua-hang', {
            title: 'Thuê cửa hàng',
        });
    }


    tkns(req, res, next) {
        res.render('pages/site/cho_thue/thue-kho-nha-suong', {
            title: 'Thuê kho, nhà sưởng',
        });
    }

    snd(req, res, next) {
        res.render('pages/site/sang_nhuong/sang-nhuong-dat', {
            title: 'Sang nhượng đất',
        });
    }

    snnr(req, res, next) {
        res.render('pages/site/sang_nhuong/sang-nhuong-nha-rieng', {
            title: 'Sang nhượng nhà riêng',
        });
    }

    snchcc(req, res, next) {
        res.render('pages/site/sang_nhuong/sang-nhuong-can-ho-chung-cu', {
            title: 'Sang nhượng căn hộ chung cư',
        });
    }

    snch(req, res, next) {
        res.render('pages/site/sang_nhuong/sang-nhuong-cua-hang', {
            title: 'Sang nhượng cửa hàng ',
        });
    }


    mbd(req, res, next) {
        res.render('pages/site/tho_cu/mua-ban-dat', {
            title: 'Mua bán đất',
        });
    }

    dct(req, res, next) {
        res.render('pages/site/tho_cu/dat-cho-thue', {
            title: 'Đất cho thuê ',
        });
    }

    dtc(req, res, next) {
        res.render('pages/site/tho_cu/dat-tho-cu', {
            title: 'Đất thổ cư',
        });
    }

    dnda(req, res, next) {
        res.render('pages/site/tho_cu/dat-nen-du-an', {
            title: 'Đất nền dự án',
        });
    }

    dctt(req, res, next) {
        res.render('pages/site/tho_cu/dat-canh-tac', {
            title: 'Đất canh tác',
        });
    }

    nmg(req, res, next) {
        res.render('pages/site/danh_ba/nha-moi-gioi', {
            title: 'Nhà môi giới',
        });
    }

    dn(req, res, next) {
        res.render('pages/site/danh_ba/doanh-nghiep', {
            title: 'Doanh nghiệp',
        });
    }


    error(req, res) {
        res.render('pages/404/404', {
            title: '404'
        });
    }

}



module.exports = new SiteController;