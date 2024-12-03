const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/User.model.js");
const Cart = require('../models/Cart.model.js');
const Order = require('../models/Order.model.js')
const dotenv = require('dotenv');
dotenv.config()
const authController = {
    // aa 
    async signUp(req, res) {
        const { fullName, username, email, password } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);
            const cartID = await Cart.create(req.body)
            const newUser = new User({
                fullName: fullName,
                username: username,
                email: email,
                password: hashed,
                cart_id: cartID._id,
            })
            const user = await newUser.save();
            cartID.user_id = user._id
            cartID.save()
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json('Something wrong!')
        }
    },

    //GENERATE_ACCSESS_TOKEN
    genarateAccessToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_ACCSESS_KEY,
            { expiresIn: "90d" }
        );
    },
    //GENERATE_REFRESH_TOKEN
    genarateRegreshToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn: "365d" }
        );
    },

    async signIn(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username })
            if (!user) {
                return res.status(400).json("Wrong username!");
            }
            const vaidPassword = await bcrypt.compare(

                password,
                user.password
            )
            if (!vaidPassword) {
                return res.status(400).json("Wrong password!");
            }
            if (user && vaidPassword) {
                const accessToken = authController.genarateAccessToken(user);
                const refreshToken = authController.genarateRegreshToken(user);
                user.refreshToken = refreshToken;

                await user.save();
                const { password, ...other } = user._doc;
                return res.status(200).json({ ...other, accessToken });
            }
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    requestRefreshToken: async (req, res) => {
        const { username } = req.body;
        const user = await User.findOne({ username })

        if (!user.refreshToken)
            return res.status(401).json("You 're not a auth!!!");

        jwt.verify(user.refreshToken, process.env.JWT_REFRESH_KEY, async (err, data) => {
            if (err) {
                console.log(err);
            }
            //Create a new access, refresh token
            const newAccessToken = authController.genarateAccessToken(data);
            const newRefreshToken = authController.genarateRegreshToken(data);
            user.refreshToken = newRefreshToken;
            await user.save();

            res.status(200).json(newAccessToken);
        })
    },

    async signOut(req, res) {
        const { username } = req.body;
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json("Wrong username!");
        }

        user.refreshToken = undefined;

        await user.save();
        return res.status(200).json("Thoát Thành Công!!!!")
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findById(req.user.id)
            return res.status(201).json(user)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    async getAllUser(req, res) {
        try {
            const user = await User.find().lean()
            return res.status(201).json(user)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
    async getOneUserOfAdmin(req, res) {
        try {
            const user = await User.findById(req.headers.id).populate('history')
            return res.status(201).json(user)
        }
        catch (err) {
            return res.status(500).json(err)
        }
    },
};

module.exports = authController