import { CouponType } from './../entity/Coupon';
import { ProductRepository } from './../repository/product.repository';
import { CouponRepository } from './../repository/coupon.repository';
import { faker } from '@faker-js/faker';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
export default class CouponService {
  static async getAllProducts(
    req: Request,
    res: Response,
    next?: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
      let coupon_code: string | any = req.query.coupon_code;
      const coupon = await CouponRepository.findOne({
        where: { name: coupon_code },
      });
      if (!coupon) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Please provide a valid coupon code',
            },
          ],
        });
      }
      const cartPrice = await ProductRepository.query(
        `SELECT SUM(price) as total FROM product`
      );
      const cartSize = await ProductRepository.query(
        `SELECT COUNT(id) as size FROM product`
      );

      const totalPrice = cartPrice[0]?.total;
      let totalPricePercentDiscount = (Number(coupon.value) * totalPrice) / 100;
      let totalPriceFixDiscount = totalPrice - Number(coupon.value);
      switch (coupon.type) {
        case CouponType.Fixed:
          if (cartSize[0]?.size < 1) {
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must have at least one product',
                },
              ],
            });
          }
          if (totalPrice < 50)
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must be greater than $50',
                },
              ],
            });

          return res.json({
            totalPrice: `$${totalPrice}`,
            discountPrice: `${totalPriceFixDiscount}}`,
            discount: `$${coupon.value}`,
            couponType: coupon.type,
            couponName: coupon.name,
          });

        case CouponType.Percent:
          if (cartSize[0]?.size < 2) {
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must have at least 2 product',
                },
              ],
            });
          }
          if (totalPrice < 100)
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must be greater than $100',
                },
              ],
            });
          return res.json({
            totalPrice: `$${totalPrice}`,
            discountPrice: `$${totalPricePercentDiscount}`,
            discount: `${coupon.value}%`,
            couponType: coupon.type,
            couponName: coupon.name,
          });

        case CouponType.Mixed:
          if (cartSize[0]?.size < 3) {
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must have at least 3 product',
                },
              ],
            });
          }
          if (totalPrice < 200)
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must be greater than $200',
                },
              ],
            });
          const discountPrice =
            totalPriceFixDiscount > totalPricePercentDiscount
              ? totalPriceFixDiscount
              : totalPricePercentDiscount;
          return res.json({
            totalPrice: `$${totalPrice}`,
            discountPrice: `$${discountPrice}`,
            discount: `$${coupon.value}`,
            couponType: coupon.type,
            couponName: coupon.name,
          });

        case CouponType.Rejected:
          if (totalPrice < 1000)
            return res.status(400).json({
              errors: [
                {
                  msg: 'Cart must be greater than $1000',
                },
              ],
            });
          totalPricePercentDiscount = (Number(coupon.value) * totalPrice) / 100;
          totalPriceFixDiscount =
            totalPricePercentDiscount - Number(coupon.value);
          return res.json({
            totalPrice: `$${totalPrice}`,
            discountPrice: `$${totalPrice - Number(coupon.value)}`,
            discount: `$${coupon.value}`,
            couponType: coupon.type,
            couponName: coupon.name,
          });
        default:
          return res.status(400).json({
            errors: [
              {
                msg: 'Please provide a valid coupon code',
              },
            ],
          });
      }
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next?: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

      const { name, value, type } = req.body;
      const coupon = CouponRepository.create({
        name: name?.toUpperCase(),
        value,
        type,
      });
      await CouponRepository.save(coupon);
      res.status(201).json({ product: coupon });
    } catch (err) {
      next(err);
    }
  }
}

// cartRoute.post('/',;
