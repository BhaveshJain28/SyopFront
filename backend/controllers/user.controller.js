import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate a short-lived access token
const generateAccessToken = (id) => jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
// Generate a long-lived refresh token
const generateRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

// Registrartion function of user
export const registerUser = async (req, res) => {
    const { FirstName, LastName, email, password, ConfirmPassword } = req.body;
    if (!FirstName || !email || !password || !ConfirmPassword) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
    if (password !== ConfirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        // Normalize email: trim and lowercase
        const normalizedEmail = email.trim().toLowerCase();
        
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            FirstName,
            LastName,
            email: normalizedEmail,
            password: hashedPassword
        });
        
        console.log("User registered:", user._id, "Email:", normalizedEmail);
        
        // Registration ke baad seedhe login karwa rahe hain
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Refresh token ko HttpOnly cookie mein save karna security ke liye best practice hai
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(201).json({
            success: true,
            message: "User registered Successfully",
            user: userResponse,
            token: accessToken
        });
    } catch (error) {
        console.error("Register Error:", error); // <-- Yahan error print kar rahe hain
        res.status(500).json({
            message: 'Server error',
            error: error.message // <-- Yahan message bhej rahe hain
        });
    }

}

// login function got user

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    try {
        // Trim email to remove whitespace and make case-insensitive
        const trimmedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: trimmedEmail });
        
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        
        // Debug: Check if password exists in user object
        if (!user.password) {
            console.error("Password field missing for user:", user._id);
            return res.status(500).json({ message: 'User data corrupted' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.warn(`Password mismatch for user: ${email}`);
            return res.status(400).json({ message: 'Invalid credentials. Please check your password!' });
        }
        
        // Login success hone par, naye access aur refresh tokens generate karo
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        
        // Refresh token ko secure HttpOnly cookie mein store karo
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        
        // Return user without password
        const userResponse = user.toObject();
        delete userResponse.password;
        
        res.status(200).json({
            success: true,
            message: "User logged in Successfully",
            token: accessToken,
            user: userResponse
        });
    } catch (error) {
        console.error("Login Error:", error); // <-- Yahan error print kar rahe hain
        res.status(500).json({
            message: 'Server error',
            error: error.message // <-- Yahan message bhej rahe hain
        });
    }
}
// Ye naya function hai jo expired access token ko refresh karega

export const refreshTokenHandle = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateAccessToken(decoded.id);
        res.json({
            success: true,
            accessToken: newAccessToken
        });
    } catch (error) {
        res.clearCookie('refreshToken');
        res.status(403).json({ message: 'Refresh token is invalid or expired', error: error.message });
    }
}

// profile function to get user details

export const profile = async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
}