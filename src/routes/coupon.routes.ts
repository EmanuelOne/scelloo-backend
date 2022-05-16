import { CouponType } from './../entity/Coupon';
import { ProductRepository } from '../repository/product.repository';
import { Router } from 'express';
import { faker } from '@faker-js/faker';
import { body, query } from 'express-validator';
import CouponController from '../controller/coupon.controller';
const couponRoute = Router();
const couponTypes = Object.values(CouponType);
couponRoute.get(
  '/',
  query('coupon_code')
    .isString()
    .isLength({ min: 5, max: 15 })
    .withMessage('Please Provide a valid coupon code'),
  CouponController.getAll
);
couponRoute.post(
  '/',

  [
    body('name')
      .isString()
      .isLength({ min: 5, max: 15 })
      .withMessage('Please provide a valid name'),
    body('value').isNumeric().withMessage('Please provide a valid value'),
    body('type')
      .isIn(couponTypes)
      .withMessage(`Please provide either ${couponTypes}`),
  ],

  CouponController.createCoupon
);

export default couponRoute;
