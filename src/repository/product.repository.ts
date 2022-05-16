import { Product } from './../entity/Product';
import { DB } from './../data-source';

export const ProductRepository = DB.getRepository(Product).extend({});
