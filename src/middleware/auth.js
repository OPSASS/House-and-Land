const { User } = require('../app/models/User');

module.exports.requireAuth = (req, res, next) => {
    const user = User.findOne({ _id: req.session.userId });
    if (!user) {
        return res.status(403).json({
            message: 'Bạn chưa đăng nhập'
        });
    }
    if (!req.cookies.userId) {
        res.redirect('/auth/login');
        return;
    }
    if (user) {
        return next();
    }
    next();
}