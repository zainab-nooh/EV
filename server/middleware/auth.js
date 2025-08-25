import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET);
    
    // Find the user
    const user = await User.findById(decoded.user._id);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Add user to request object
    req.user = user;
    
    // Initialize res.locals.data if it doesn't exist
    if (!res.locals.data) {
      res.locals.data = {};
    }

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export default checkAuth;