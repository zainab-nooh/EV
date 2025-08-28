import express from 'express';
import checkAuth from '../middleware/auth.js';
import { dataController, apiController } from '../controllers/categoryController.js';
import itemsCtrl from '../controllers/itemController.js';
const router = express.Router();

// Get Categories
router.get('/categories', dataController.index, apiController.index);

// Get Items
router.get('/items', checkAuth, itemsCtrl.index);

export default router;
