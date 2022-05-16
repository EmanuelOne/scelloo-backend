import * as express from 'express';
import * as cors from 'cors';
import cartRoute from './routes/cart.routes';
import { DB } from './data-source';
import couponRoute from './routes/coupon.routes';
DB.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/cart', cartRoute);
    app.use('/coupon', couponRoute);
    app.listen(3000, () => {
      console.log('Express server started on port 3000');
    });
  })
  .catch((error) => console.log(error));
