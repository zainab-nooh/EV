import express from 'express';
import { profileController } from '../controllers/profilController.js';
import checkAuth from '../middleware/auth.js';

const router = express.Router();

// GET current user's profile
router.get('/profile', checkAuth, profileController.getProfile);

export default router;
