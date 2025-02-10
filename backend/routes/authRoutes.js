const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!password || password.trim() === "") {
            return res.status(400).json({ message: "Password is required" });
        }

        const userExist = await User.findOne({ email });
        if (userExist) return res.status(400).json({ message: 'User Already Exists...' });

        console.log("🔹 Raw Password Before Hashing:", password);

        //  Generate bcrypt salt to force "$2b$"
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("🔹 Hashed Password Before Storing:", hashedPassword);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        console.log(" User Registered Successfully");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ token, user: { id: user._id, name, email } });

    } catch (error) {
        console.error(" Registration Error:", error);
        res.status(500).json({ message: 'Server Error...', error });
    }
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'User not found...' });

        console.log("🔹 Entered Password:", password);
        console.log("🔹 Stored Hashed Password in DB:", user.password);

        // Ensure password is compared correctly
        const isMatch = await bcrypt.compare(password, user.password);

        console.log(" Password Match:", isMatch);

        if (!isMatch) return res.status(400).json({ message: 'Invalid Password...' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, email, name: user.name } });

    } catch (error) {
        console.error(" Login Error:", error);
        res.status(500).json({ message: 'Server Error...', error });
    }
});

router.post('/guest-login', async (req, res) => {
    try {
        const guestUser = { id: 'guest', name: 'Guest User' };
        const token = jwt.sign(guestUser, process.env.JWT_SECRET, { expiresIn: "1d" }); 
        res.json({ token, user: guestUser });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});



router.get("/profile", protect, async (req, res) => {
    
    try {
        //  If the user is a guest, return guest profile
        if (req.user.id === "guest") {
            return res.json({ id: "guest", name: "Guest User", role: "Guest" });
        }

        //  Fetch all users from the database (excluding passwords)
        const users = await User.find().select("-password");

        //  Return both guest and database users
        res.json({
            guestUser: { id: "guest", name: "Guest User", role: "Guest" },
            registeredUsers: users
        });

    } catch (error) {
        console.error(" Profile Fetch Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;