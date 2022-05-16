import { Response, Request, NextFunction } from 'express';
import CouponService from '../service/coupon.service';
export default class CouponController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    await CouponService.getAllProducts(req, res, next);
  }
  static async createCoupon(req: Request, res: Response, next: NextFunction) {
    try {
      await CouponService.create(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
