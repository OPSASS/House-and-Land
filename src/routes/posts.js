const express = require('express');
const router = express.Router();

const { upload } = require('../middleware/multer');

// Add Route
const PostsController = require('../app/controllers/PostsController');

// render
// post index
// /posts/dang-tin-bds
router.get('/dang-tin-bds', PostsController.index);

// Post files form to server
// POST /posts/dang-tin-bds
router.post('/dang-tin-bds', upload.array("files"), PostsController.upload);

// Get Success Post
// GET /posts/dang-tin-thanh-cong
router.get('/dang-tin-thanh-cong', ensureAuthenticated, PostsController.success);

// Load Edit Form
// GET /posts/:id/edit
router.get('/:id/edit', ensureAuthenticated, PostsController.edit);

// Update Submit POST Route
// PUT /posts/edit/:id
router.put('/:id', ensureAuthenticated, PostsController.update);

// Delete Posts
// DELETE /posts/:id/delete
router.delete('/delete/:id', ensureAuthenticated, PostsController.delete);

// Delete Posts Delay 
// POST /posts/:id/delete/delay
router.post('/:id/delete/delay', ensureAuthenticated, PostsController.deleteDelay);


// Soft Delete
// DELETE /posts/:id/softDelete
router.post('/:id/softDelete', ensureAuthenticated, PostsController.softDelete);

// Get Single Posts

// Search
// GET /posts/search
router.get('/search/:key', PostsController.search);

// Render Page
// GET /posts/tin-dang-ban
router.get('/tin-dang-ban', PostsController.sell);

router.get('/tin-cho-thue', PostsController.rent);

router.get('/tin-sang-nhuong', PostsController.transfers);


// Access Control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

module.exports = router;