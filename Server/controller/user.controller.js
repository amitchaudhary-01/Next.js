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

        ///bcrypt password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the user with the request body data
        const data = await User.create({
            name,
            email,
            address,
            phone,
            password:hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully",
            data
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

export default Create;