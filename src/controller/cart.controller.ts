import { Response, Request, NextFunction } from 'express';
import CartService from '../service/cart.service';
export default class CartController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      await CartService.getAllProducts(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
