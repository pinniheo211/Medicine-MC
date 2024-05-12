import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import product from './reducers/product';
import warehouse from './reducers/warehouse';
export default configureStore({
  reducer: {
    auth: auth,
    product: product,
    warehouse: warehouse
  }
});
