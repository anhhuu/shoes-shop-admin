const util = require("util");
const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './src/public/img-upload');
    },
    filename: (req, file, callback) => {
        let math = ["image/png", "image/jpeg"];
        if (math.indexOf(file.mimetype) === -1) {
            let errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`;
            return callback(errorMess, null);
        }

        let filename = `${Date.now()}-shoes-shop-${file.originalname}`;
        callback(null, filename);
    }
});

let singleFileUpload = (file) => {
    return multer({ storage: storage }).single(file);
}

let multipleFilesUpload = (file) => {
    return multer({ storage: storage }).array(file, 4);
}

module.exports = {
    singleFileUpload,
    multipleFilesUpload
};