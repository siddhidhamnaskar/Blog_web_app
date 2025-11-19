const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const signup = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(8);
        const hashPass = await bcrypt.hash(req.body.Password, salt);
        const newUser = new User({
            Name: req.body.Name,
            Email: req.body.Email,
            Password: hashPass
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ Email: req.body.Email });
        if (!user) return res.status(400).json("Wrong Credentials");

        const validate = await bcrypt.compare(req.body.Password, user.Password);
        if (validate) {
            jwt.sign({ Name: user.Name, Email: user.Email, id: user._id }, secret, { expiresIn: "1h" }, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(token);
            });
        } else {
            res.status(400).json("Incorrect Password");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const profile = async (req, res) => {
    try {
        let token = req.body.token;
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err;
            res.json(info);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const logout = async (req, res) => {
    res.cookie('token', " ").json("ok");
};

module.exports = { signup, login, profile, logout };
