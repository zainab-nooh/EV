import express from 'express';
import { dataController, apiController } from '../controllers/userController.js'

const router = express.Router();

router.post('/', dataController.create, apiController.auth)

router.post('/login', dataController.login, apiController.auth)

export default router;