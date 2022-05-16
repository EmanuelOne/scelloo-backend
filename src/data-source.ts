import { Coupon } from './entity/Coupon';
import { Product } from './entity/Product';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const DB = new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [Product, Coupon],
  migrations: [],
  subscribers: [],
  ssl: process.env.NODE_ENV === 'development' ? false : true,
});
