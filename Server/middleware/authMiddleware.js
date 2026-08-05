import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    try {
        // 1. Get token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // 2. Verify the token using your secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        
        // 3. Attach user data to the request object
        req.user = decoded;

        // 4. Proceed to the next middleware or controller
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(403).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};