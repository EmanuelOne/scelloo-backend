import { faker } from '@faker-js/faker';
import { ProductRepository } from '../repository/product.repository';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
export default class CartService {
  static async getAllProducts(
    req: Request,
    res: Response,
    next?: NextFunction
  ) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const products = await ProductRepository.find({});
      const sumOfprice = await ProductRepository.query(
        `SELECT SUM(price) as total_price FROM product`
      );
      res.status(200).json({ products, totalPrice: sumOfprice[0].total_price });
    } catch (err) {
      next(err);
    }
  }
  static async create(req: Request, res: Response, next?: NextFunction) {
    const products = Array.from({ length: 1000 }, () => ({
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
    }));
    const product = ProductRepository.create(products);
    await ProductRepository.save(product);
    res.status(201).json({ product });
  }
}
