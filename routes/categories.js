import express from 'express';
import { dataController, apiController } from '../controllers/categoryController.js';
import checkAuth from '../middleware/auth.js';
const router = express.Router();

router.get('/', checkAuth, dataController.index, apiController.index);
router.get('/:id', checkAuth, dataController.show, apiController.show);
router.post('/', checkAuth, dataController.create, apiController.create);
router.put('/:id', checkAuth, dataController.update, apiController.update);
router.delete('/:id', checkAuth, dataController.delete, apiController.delete);



export default router;