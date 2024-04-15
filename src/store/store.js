import { configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import product from './reducers/product';
export default configureStore({
  reducer: {
    auth: auth,
    product: product
  }
});
