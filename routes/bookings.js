import express from 'express';
import { cart, addToCart, setItemQtyInCart, checkout, history } from '../controllers/bookingController.js';

const router = express.Router();

router.get('/cart', cart);

router.get('/history', history);

router.post('/cart/items/:id', addToCart);

router.post('/cart/checkout', checkout);

router.put('/cart/qty', setItemQtyInCart);

export default router;