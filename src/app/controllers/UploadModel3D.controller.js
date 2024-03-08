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
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});

const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.glb', '.gltf'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (allowedExtensions.includes(fileExtension)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only GLB and GLTF files are allowed.'));
    }
};

const upload3D = multer({ storage: storage, fileFilter: fileFilter });

const uploadController3D = (req, res) => {
    try {
        const fileUrls = req.files.map(file => file.filename);
        res.status(200).json({
            message: 'Files uploaded successfully',
            files: req.files.map((file, index) => ({
                originalname: file.originalname,
                filename: file.filename,
                path: file.path,
                fileUrl: fileUrls[index],
            })),
        });
    } catch (error) {
        console.error('Error uploading files:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteFile3D = (req, res) => {
    try {
        const filePath = path.join(__dirname, '../../public', req.params.id);
        fs.unlinkSync(filePath);
        res.status(200).json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { upload3D, uploadController3D, deleteFile3D };
