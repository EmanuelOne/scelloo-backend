import { Coupon } from './../entity/Coupon';
import { DB } from '../data-source';

export const CouponRepository = DB.getRepository(Coupon).extend({});
