const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        const nombre = Date.now() + '-' + file.originalname;
        cb(null, nombre);
    }
});

const fileFilter = (req, file, cb) => {
    const tipos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (tipos.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de imagen no valido'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = upload;