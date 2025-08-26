import User from '../models/User.js';

// Data controller
export const profileController = {
  // GET /api/users/profile
  async getProfile(req, res, next) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user); // send user data directly
    } catch (err) {
      next(err);
    }
  },
};
