import User from "../schema/user.schema.js"
import bcrypt from 'bcryptjs'

const Create = async (req, res) => {
    try {
        const { name, email, address, phone, password } = req.body;

        // Check for missing fields
        if (!name || !email || !address || !password || !phone) {
            return res.status(400).json({
                message: "Data Are Missing"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email Already Exist"
            });
        }

        // Check if email matches the admin whitelist in .env
        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim()) : [];
        const role = adminEmails.includes(email) ? 'admin' : 'user';

        // Bcrypt password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user with the role
        const data = await User.create({
            name,
            email,
            address,
            phone,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: `User created successfully as ${role}`,
            data: {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export default Create;


import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password."
            });
        }

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Dynamically verify/sync admin status based on .env whitelist
        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',').map(e => e.trim()) : [];
        const expectedRole = adminEmails.includes(user.email) ? 'admin' : 'user';
        
        if (user.role !== expectedRole) {
            user.role = expectedRole;
            await user.save();
        }

        // Generate a JWT token containing user id, email, and role
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1d' }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000, 
        });

        // Send success response with token and role info
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            data: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const LogOut = async (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return res.status(200).json({ 
            success: true, 
            message: "Logged out successfully" 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false, 
            message: "Unable to Logout" 
        });
    }
};


export const getuser = async (req, res) => {
    try {
        const data = await User.find().select("-password"); // Hide passwords for security

        return res.status(200).json({
            message: "User Fetch Successfully",
            success: true,
            data // <--  the array is sent here
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}