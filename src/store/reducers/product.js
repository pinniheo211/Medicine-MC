import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../api/index';
import { toast } from 'react-toastify';

const actionGetProduct = createAsyncThunk('product/getProduct', async () => {
  try {
    const res = await productService.getProduct();
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return error.response.data;
  }
});

const { reducer } = createSlice({
  name: 'product',
  initialState: {
    getProduct: {
      loading: false,
      data: null,
      error: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetProduct.pending, (state) => {
        state.getProduct.loading = true;
      })
      .addCase(actionGetProduct.rejected, (state, action) => {
        state.getProduct.loading = false;
        state.getProduct.error = action.payload;
        state.getProduct.data = {};
      })
      .addCase(actionGetProduct.fulfilled, (state, action) => {
        state.getProduct.loading = false;
        state.getProduct.data = action.payload;
        state.getProduct.error = '';
      });
  }
});

export default reducer;

export { actionGetProduct };
