import express from 'express';
import checkAuth from '../middleware/auth.js';
import { dataController, apiController } from '../controllers/categoryController.js';
import itemsCtrl from '../controllers/itemController.js';
const router = express.Router();

// Get Categories
router.get('/', itemsCtrl.index)
// Get Items
router.get('/', checkAuth, dataController.index, apiController.index)