import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const protect = async (req, res, next) => {
    try {
        // Extract token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or invalid format' });
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Token is empty' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid or malformed token', error: error.message });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired', error: error.message });
        }
        
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};
