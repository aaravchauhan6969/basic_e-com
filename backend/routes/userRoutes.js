const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    await user.save();

    res.json({
        message: "User Registered"
    });
});

router.post("/login", async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
    );

    if (!validPassword) {
        return res.status(400).json({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
    );

    res.json({
        token,
        user
    });
});

module.exports = router;