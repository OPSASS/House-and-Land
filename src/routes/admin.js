const express = require('express');
const { use } = require('passport');
const { users } = require('../app/controllers/adminController');
const router = express.Router();

const adminController = require('../app/controllers/adminController');
const { User } = require('../app/models/User');

// [GET]
// render home
// /admin
router.get('/', ensureAuthenticated, adminController.index);

// render login
// /admin/login
router.get('/login', adminController.login);

// render users
// /admin/users
router.get('/users', ensureAuthenticated, adminController.users);

// render posts
// /admin/posts
router.get('/posts', ensureAuthenticated, adminController.posts);

// view posts
// /admin/posts/view/:id
router.get('/posts/view/:id', ensureAuthenticated, adminController.viewPost);

// accept articles
// /admin/posts/:id/accept
router.post('/posts/:id/accept', ensureAuthenticated, adminController.accept);

// delete posts
// /admin/posts/:id
router.delete('/posts/:id', ensureAuthenticated, adminController.deletePost);

// render posts user
// /admin/posts/:id
router.get('/posts/:id', ensureAuthenticated, adminController.postsUser);

// render chat
// /admin/chat
router.get('/chat', ensureAuthenticated, adminController.chat);

// render chart
// /admin/chart
router.get('/chart', ensureAuthenticated, adminController.chart);

// render feedback
// /admin/feedback
router.get('/feedback', ensureAuthenticated, adminController.feedback);

// delete feedback
// /admin/feedback/:id
router.post('/feedback/:id', ensureAuthenticated, adminController.deleteFeedback);

// render service
// /admin/service
router.get('/service', ensureAuthenticated, adminController.service);
router.post('/service/add', ensureAuthenticated, adminController.postService);
router.delete('/service/:id', ensureAuthenticated, adminController.deleteService);

// edit service
// /admin/service/:id/edit
router.get('/service/:id/edit', ensureAuthenticated, adminController.editService);
router.put('/service/:id', ensureAuthenticated, adminController.updateService);

// /admin/come-back
router.get('/come-back', ensureAuthenticated, adminController.comeBack)

// [POST]
// login
// /admin/login
router.post('/login', adminController.loginProcess);

// delete user
// /admin/users/delete
router.delete('/users/:id', ensureAuthenticated, adminController.deleteUser);


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/admin/login');
    }
}


module.exports = router;