const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"]; // Get token from request headers

    if (token) {
        token = token.split(" ")[1]; // Extract token from "Bearer <token>"
        
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid token" }); // Return error if token is invalid
            } else {
                console.log(decoded); // Log decoded token data
                req.user = decoded; // Attach decoded data to request object
            }
        });

        next(); // Move to the next middleware
    } else {
        return res.status(400).json({ message: "Invalid token" }); // Return error if token is missing
    }
};

module.exports = verifyToken;
