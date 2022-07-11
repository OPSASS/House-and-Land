const newsRouter = require('./news');
const siteRouter = require('./site');
const authRouter = require('./auth');
const postsRouter = require('./posts');
const userRouter = require('./users');
const adminRouter = require('./admin');

// use the express router
function Route(app) {
    app.use('/auth', authRouter);

    app.use('/news', newsRouter);

    app.use('/posts', postsRouter);

    app.use('/user', userRouter);

    app.use('/admin', adminRouter);

    app.use('/', siteRouter);

}

module.exports = Route;