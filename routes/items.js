// import express from 'express';
// import itemsCtrl from '../controllers/itemController.js';

// const router = express.Router();

// router.get('/', itemsCtrl.index);

// router.get('/:id', itemsCtrl.show);

// export default router;

// routes/items.js
import express from 'express'; 
import itemsCtrl from '../controllers/itemController.js';

const router = express.Router();

// Get all items
router.get('/', itemsCtrl.index);

// Get item by ID
router.get('/:id', itemsCtrl.show);

// ✅ NEW: Get items by category ID
router.get('/category/:categoryId', itemsCtrl.getItemsByCategory);

export default router;
