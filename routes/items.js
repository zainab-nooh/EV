import express from 'express'; 
import itemsCtrl from '../controllers/itemController.js';

const router = express.Router();

// Get all items
router.get('/', itemsCtrl.index);

// Get item by ID
router.get('/:id', itemsCtrl.show);

// Get items by category ID
router.get('/category/:categoryId', itemsCtrl.getItemsByCategory);

// ✅ Search items by name
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query is required' });
    const items = await itemsCtrl.searchItems(q);
    res.json({ items });
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error during search' });
  }
});

export default router;
