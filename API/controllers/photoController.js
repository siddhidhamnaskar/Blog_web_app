const Photos = require('../models/profile');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const cloudinary = require('cloudinary');
const secret = process.env.SECRET;


 cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET

})



const uploadPhoto = async (req, res) => {
    try {
        let token = req.body.token;
        const urls = [];
        const fileStr = req.file.buffer.toString("base64");

        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;

            const response = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${fileStr}`,
                { folder: "uploads", resource_type: "auto" }
            );

            urls.push(response.secure_url);
            const photo = new Photos({
                img: response.secure_url,
                Author: info.id
            });
            const Photo = await photo.save();
            res.status(200).json(Photo);
        });
    } catch (err) {
        console.log(err);
        res.status(505).json(err);
    }
};

const getPhoto = async (req, res) => {
    try {
        const data = await Photos.findOne(req.query).sort({ createdAt: -1 }).limit(20);
        res.status(200).json(data);
    } catch (err) {
        res.status(505).json(err);
    }
};

module.exports = { uploadPhoto, getPhoto };
