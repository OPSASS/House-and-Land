const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({
    //destination for files
    destination: function(request, file, cb) {
        cb(null, './src/public/img/uploads/avts/');
    },

    //add back the extension
    filename: function(request, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage })

const userController = require('../app/controllers/UserController');

// [GET]
// render form user
// /user/:id
router.get('/:id', userController.index);

//chon user
// /user/:id
router.get('/:id', userController.get);

// [PUT]
// cap nhat thong tin user
// /user/:id
router.put('/:id', ensureAuthenticated, userController.update);

router.put('/:id/avt', upload.single("profilePicture"), userController.avts);


// [DELETE]
// xoa user
// /user/:id
router.post('/:id', ensureAuthenticated, userController.delete);
router.post('/l2/:id', ensureAuthenticated, userController.delete2);

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/user/login');
    }
}




module.exports = router;