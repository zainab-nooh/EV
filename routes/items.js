import express from 'express';
import itemsCtrl from '../controllers/itemController.js';

const router = express.Router();

router.get('/', itemsCtrl.index);

router.get('/:id', itemsCtrl.show);

export default router;