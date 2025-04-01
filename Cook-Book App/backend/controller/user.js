const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User sign-up function
const userSignUp = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password and create new user
    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPwd });

    // Generate JWT token
    let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);

    return res.status(200).json({ token, user: newUser });
};

// User login function
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user and validate password
    let user = await User.findOne({ email });s
    if (user && await bcrypt.compare(password, user.password)) {
        let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
        return res.status(200).json({ token, user });
    } else {
        return res.status(400).json({ error: "Invalid credentials" });
    }
};

// Get user details by ID
const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({ email: user.email });
};

// Export functions
module.exports = { userLogin, userSignUp, getUser };
