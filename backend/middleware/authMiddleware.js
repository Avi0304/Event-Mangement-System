const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

            //  Handle Guest Users Without Database Lookup
            if (decoded.id === "guest") {
                req.user = { id: "guest", name: "Guest User" };
                return next();
            }

            //  Fetch User from Database for Regular Users
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "User not found, Unauthorized." });
            }

            next();
        } catch (error) {
            console.error("JWT Verification Error:", error.message);
            return res.status(401).json({ message: "Invalid Token." });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized, no token provided." });
    }
};

module.exports = protect;
