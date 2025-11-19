const express = require('express');
const multer = require('multer');
const { uploadPhoto, getPhoto } = require('../controllers/photoController');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post('/photo',upload.single('file'), uploadPhoto);
router.get('/photo/', getPhoto);

module.exports = router;
