// import Item from '../models/Item.js';

// export default {
//   index,
//   show
// };
// export {
//   index,
//   show
// }

// async function index(req, res) {
//   try{
//     const items = await Item.find({}).sort('name').populate('category').exec();
//     items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
//     res.status(200).json(items);
//   }catch(e){
//     res.status(400).json({ msg: e.message });
//   }
// }

// async function show(req, res) {
//   try{
//     const item = await Item.findById(req.params.id);
//     res.status(200).json(item);
//   }catch(e){
//     res.status(400).json({ msg: e.message });
//   }  
// }

// controllers/itemController.js
import Item from '../models/Item.js'; // adjust path if necessary

const itemsCtrl = {
  index: async (req, res) => {
    try {
      const items = await Item.find({});
      res.json({ items });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching items' });
    }
  },

  show: async (req, res) => {
    try {
      const item = await Item.findById(req.params.id);
      if (!item) return res.status(404).json({ message: 'Item not found' });
      res.json({ item });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching item' });
    }
  },

  // ✅ NEW: Get items by category
  getItemsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params;
      const items = await Item.find({ category: categoryId });
      res.json({ items });
    } catch (err) {
      console.error('Error fetching items by category:', err);
      res.status(500).json({ message: 'Server error while fetching items by category' });
    }
  },
    // ✅ NEW: search items by name
  searchItems: async (query) => {
    if (!query) return [];
    return Item.find({ name: { $regex: query, $options: 'i' } });
  }
};

export default itemsCtrl;
