import Category from '../models/Category.js';

const dataController = {
  async index(req, res, next) {
    try {
      const categories = await Category.find({}).sort({ sortOrder: 1, createdAt: 1 });
      res.locals.data = { categories };
      next();
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  },


  async show(req, res, next) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.locals.data = { category };
      next();
    } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  },

  async create(req, res, next) {
    try {
      const category = await Category.create(req.body);
      res.locals.data = { category };
      next();
    } catch (error) {
      console.error('Error creating category:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to create category' });
    }
  },

  async update(req, res, next) {
    try {
      const category = await Category.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.locals.data = { category };
      next();
    } catch (error) {
      console.error('Error updating category:', error);
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Failed to update category' });
    }
  },

  async delete(req, res, next) {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.locals.data = { message: 'Category deleted successfully' };
      next();
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Failed to delete category' });
    }
  }
}


const apiController = {
  index(req, res) {
    res.json(res.locals.data);
  },

  show(req, res) {
    res.json(res.locals.data);
  },

  create(req, res) {
    res.status(201).json(res.locals.data);
  },

  update(req, res) {
    res.json(res.locals.data);
  },
  
  delete(req, res) {
    res.json(res.locals.data);
  }
  
};

export { dataController, apiController };