const { User } = require('../models/User')
const bcrypt = require('bcrypt');

const passport = require('passport');
class SiteController {
    // GET /auth/register
    register(req, res) {
        res.render('pages/auth/register', {
            title: 'Đăng ký'
        });
    }

    // POST /auth/register
    registerProcess = async(req, res, next) => {

        try {
            //tao token mat khau
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const cpassword = await bcrypt.hash(req.body.cpassword, salt);

            if (hashedPassword === cpassword) {
                //tao user
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: hashedPassword,
                    cpassword: cpassword,
                    name: req.body.name,
                    phone: req.body.phone,
                    idtex: req.body.idtex,
                    address: req.body.address,
                    sex: req.body.sex,
                    type: req.body.type,
                    demand: req.body.demand
                });

                //luu user
                const user = await newUser.save();
                res.redirect('/auth/login');
            } else {
                res.status(403).send('Mật khẩu không khớp');
            }
        } catch (error) {
            next(error);
        }
    }

    // GET /auth/login
    login(req, res) {
        res.render('pages/auth/login', {
            title: 'Đăng nhập'
        });
    }

    // POST /auth/login
    loginProcess = async(req, res, next) => {
        passport.authenticate('user', {
            successRedirect: '/',
            failureRedirect: '/auth/login',
            failureFlash: true
        })(req, res, next);

    }

    // GET /auth/logout
    logout(req, res) {
        req.logout();
        res.redirect('/auth/login');
    }

    // GET /auth/reset
    reset(req, res) {
        res.render('pages/auth/reset', {
            title: 'Lấy lại mật khẩu'
        });
    }

    // POST /auth/reset
    resetProcess = async(req, res, next) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const cpassword = await bcrypt.hash(req.body.cpassword, salt);
                if (hashedPassword === cpassword) {
                    user.password = hashedPassword;
                    user.cpassword = cpassword;
                    await user.save();
                    res.redirect('/auth/login');
                } else {
                    res.status(403).send('Mật khẩu không khớp');
                    res.redirect('/auth/reset');
                }
            } else {
                res.status(403).send('Email không tồn tại');
            }
        } catch (error) {
            next(error);
        }
    }

    // POST /auth/reset/:id
    opassword = async(req, res, next) => {
        try {
            const user = await User.findOne({ _id: req.body.id });
            if (user) {
                const salt = await bcrypt.genSalt(10);
                // check password
                const isMatch = await bcrypt.compare(req.body.opassword, user.password);
                if (isMatch) {
                    const hashedPassword = await bcrypt.hash(req.body.password, salt);
                    const cpassword = await bcrypt.hash(req.body.cpassword, salt);
                    if (hashedPassword === cpassword) {
                        user.password = hashedPassword;
                        user.cpassword = cpassword;
                        await user.save();
                        res.redirect('/auth/login');
                    } else {
                        res.status(403).send('Mật khẩu không khớp');
                        res.redirect('/user/' + user.id);
                    }
                } else {
                    res.status(403).send('Mật khẩu không khớp');
                    res.redirect('/user/' + user.id);
                }
            } else {
                res.status(403).send('Email không tồn tại');
            }
        } catch (error) {
            next(error);
        }
    }

}
module.exports = new SiteController;