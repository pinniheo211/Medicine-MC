import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import product from './reducers/product';
import warehouse from './reducers/warehouse';
import category from './reducers/category';
import brand from './reducers/brand';
export default configureStore({
  reducer: {
    auth: auth,
    product: product,
    warehouse: warehouse,
    category: category,
    brand: brand
  }
});
