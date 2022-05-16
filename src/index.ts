import * as express from 'express';
import * as cors from 'cors';
import cartRoute from './routes/cart.routes';
import { DB } from './data-source';
import couponRoute from './routes/coupon.routes';
import * as dotenv from 'dotenv';
dotenv.config();
DB.initialize()
  .then(async () => {
    const port = process.env.PORT || 3000;
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/cart', cartRoute);
    app.use('/coupon', couponRoute);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
