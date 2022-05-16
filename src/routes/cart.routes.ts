import { Router } from 'express';
import CartController from '../controller/cart.controller';
const cartRoute = Router();

cartRoute.get('/', CartController.getCart);
cartRoute.post('/', CartController.create);

export default cartRoute;
