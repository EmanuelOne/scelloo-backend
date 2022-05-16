import { Response, Request, NextFunction } from 'express';
import CartService from '../service/cart.service';
export default class CartController {
  static async getCart(req: Request, res: Response, next: NextFunction) {
    try {
      await CartService.getAllProducts(req, res, next);
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await CartService.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
