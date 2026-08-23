import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
  try {
    let token = null;

    // 1. Check Authorization Header (Bearer token)
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } 
    // 2. Fallback: Check Cookies (requires cookie-parser middleware in server.js)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // 3. Check if token exists
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    // 4. Verify token and decode user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'room_rental_super_secret_8f3a9c2e1b7d');
    req.user = decoded;

    // 5. Check if the user has the admin role
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Invalid or expired token.' 
    });
  }
};