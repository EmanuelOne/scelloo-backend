import { ProductRepository } from './../repository/product.repository';
import { Router } from 'express';
import { faker } from '@faker-js/faker';
import CartController from '../controller/cart.controller';
const cartRoute = Router();

cartRoute.get('/', CartController.getAll);

export default cartRoute;
