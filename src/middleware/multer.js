const multer = require('multer');

const storage = multer.diskStorage({
    //destination for files
    destination: function(request, file, cb) {
        cb(null, 'src/public/img/uploads/posts');
    },

    //add back the extension
    filename: function(request, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage,
    limits: {
        fieldSize: 1024 * 1024 * 3, // 3MB
    },
});

module.exports = { upload };