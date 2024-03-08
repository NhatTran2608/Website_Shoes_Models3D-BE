const multer = require('multer');
const path = require('path');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.resolve(__dirname, '../../public');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'));
    }
};

const upload = multer({ storage: storage })

const uploadController = (req, res) => {
    try {
        // if (!req.files || req.files.length === 0) {
        //     return res.status(400).json({ error: 'No files uploaded' });
        // }
        const imageUrls = req.files.map(file => file.filename);
        res.status(200).json({
            message: 'Files uploaded successfully',
            files: req.files.map((file, index) => ({
                originalname: file.originalname,
                filename: file.filename,
                path: file.path,
                imageUrl: imageUrls[index],
            })),
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteImage = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../public', req.params.id);
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { upload, uploadController, deleteImage };
