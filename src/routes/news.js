const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    //destination for files
    destination: function(request, file, cb) {
        cb(null, './src/public/img/uploads/news/');
    },

    //add back the extension
    filename: function(request, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage })

const newController = require('../app/controllers/NewsController');

router.get('/tin-noi-bat', newController.tnb)
router.get('/tin-tuc', newController.tt)
router.get('/tu-van', newController.tv)
router.get('/newsPost', newController.dangbao)
router.post('/newsPost', upload.array("files"), newController.news)

module.exports = router;