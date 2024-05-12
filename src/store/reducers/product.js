import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productService } from '../api/index';
import { toast } from 'react-toastify';

const actionGetProduct = createAsyncThunk('product/getProduct', async (id) => {
  try {
    const res = await productService.getProduct(id);
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
const actionAddNewProduct = createAsyncThunk('product/addProduct', async (data) => {
  try {
    const res = await productService.addNewProduct(data);
    if (res.status === 200 && res.data.err !== 1) {
      toast.success(res.data.mes);
      debugger;
      return res.data;
    } else {
      debugger;
      toast.error(res.data.mes);
      return res.data;
    }
  } catch (error) {
    debugger;

    const message = error.response.data?.message || error.message;
    toast.error(message);
    return error.response.data;
  }
});

const actionDeleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  try {
    const res = await productService.deleteProduct(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      return res.data;
    } else {
      debugger;
      toast.error(res.data.message);
      return res.data;
    }
  } catch (error) {
    debugger;

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
    },
    addProduct: {
      loading: false,
      data: null,
      error: ''
    },
    deleteProduct: {
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
      })
      //add Product
      .addCase(actionAddNewProduct.pending, (state) => {
        state.addProduct.loading = true;
      })
      .addCase(actionAddNewProduct.rejected, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.error = action.payload;
        state.addProduct.data = {};
      })
      .addCase(actionAddNewProduct.fulfilled, (state, action) => {
        state.addProduct.loading = false;
        state.addProduct.data = action.payload;
        state.addProduct.error = '';
      })
      // delete product
      .addCase(actionDeleteProduct.pending, (state) => {
        state.deleteProduct.loading = true;
      })
      .addCase(actionDeleteProduct.rejected, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.error = action.payload;
        state.deleteProduct.data = {};
      })
      .addCase(actionDeleteProduct.fulfilled, (state, action) => {
        state.deleteProduct.loading = false;
        state.deleteProduct.data = action.payload;
        state.deleteProduct.error = '';
      });
  }
});

export default reducer;

export { actionGetProduct, actionAddNewProduct, actionDeleteProduct };
