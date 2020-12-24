const multer = require('multer');
const cloudinary = require('./cloudinary')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require("path");

// Multer config
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'shoes-shop',
        public_id: (req, file) => `shoes-shop-website-${file.originalname.split('.')[0]}${Date.now()}`,
    },
});

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            callback(new Error("File type is not supported"), false);
            return;
        }
        callback(null, true);
    },
});