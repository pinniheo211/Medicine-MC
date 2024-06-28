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

const actionGetDetailProduct = createAsyncThunk('product/getDetailProduct', async (id) => {
  try {
    const res = await productService.detailProduct(id);
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
      toast.success('Created product');
      return res.data;
    } else {
      toast.error(res.data.mes);
      return res.data;
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    toast.error(message);
    return error.response.data;
  }
});

const actionUpdateProduct = createAsyncThunk('product/updateProduct', async (data) => {
  try {
    const res = await productService.updateProduct(data);
    if (res.status === 200) {
      toast.success('Update product successfully');
      return res.data;
    } else {
      toast.error(res.data.mes);
      return res.data;
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    return message;
  }
});
const actionGetProductById = createAsyncThunk('product/getProduct-byuser', async (id) => {
  try {
    const res = await productService.getProductByUserId(id);
    if (res.status === 200) {
      return res.data;
    } else {
      toast.error(res.data.mes);
      return res.data;
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    return message;
  }
});

const actionDeleteProductByAdmin = createAsyncThunk('product/deleteproduct-byadmin', async (data) => {
  try {
    const res = await productService.deleteProductByAdmin(data);
    if (res.status === 200) {
      toast.success('Product deleted successfully');
      return res.data;
    } else {
      toast.error(res.data.mes);
      return res.data;
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    return message;
  }
});

const actionDeleteProduct = createAsyncThunk('product/deleteProduct', async (id) => {
  try {
    const res = await productService.deleteProduct(id);
    if (res.status === 200) {
      toast.success(res.data.mes);
      return res.data;
    } else {
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
    },
    updateProduct: {
      loading: false,
      data: null,
      error: ''
    },
    detailProduct: {
      loading: false,
      data: null,
      error: ''
    },
    getProductByUser: {
      loading: false,
      data: null,
      error: ''
    },
    deleteProductByAdmin: {
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
      })
      //update product
      .addCase(actionUpdateProduct.pending, (state) => {
        state.updateProduct.loading = true;
      })
      .addCase(actionUpdateProduct.rejected, (state, action) => {
        state.updateProduct.loading = false;
        state.updateProduct.error = action.payload;
        state.updateProduct.data = {};
      })
      .addCase(actionUpdateProduct.fulfilled, (state, action) => {
        state.updateProduct.loading = false;
        state.updateProduct.data = action.payload;
        state.updateProduct.error = '';
      })
      //detail Product
      .addCase(actionGetDetailProduct.pending, (state) => {
        state.detailProduct.loading = true;
      })
      .addCase(actionGetDetailProduct.rejected, (state, action) => {
        state.detailProduct.loading = false;
        state.detailProduct.error = action.payload;
        state.detailProduct.data = {};
      })
      .addCase(actionGetDetailProduct.fulfilled, (state, action) => {
        state.detailProduct.loading = false;
        state.detailProduct.data = action.payload;
        state.detailProduct.error = '';
      })
      .addCase(actionGetProductById.pending, (state) => {
        state.getProductByUser.loading = true;
      })
      .addCase(actionGetProductById.rejected, (state, action) => {
        state.getProductByUser.loading = false;
        state.getProductByUser.error = action.payload;
        state.getProductByUser.data = {};
      })
      .addCase(actionGetProductById.fulfilled, (state, action) => {
        state.getProductByUser.loading = false;
        state.getProductByUser.data = action.payload;
        state.getProductByUser.error = '';
      })
      .addCase(actionDeleteProductByAdmin.pending, (state) => {
        state.deleteProductByAdmin.loading = true;
      })
      .addCase(actionDeleteProductByAdmin.rejected, (state, action) => {
        state.deleteProductByAdmin.loading = false;
        state.deleteProductByAdmin.error = action.payload;
        state.deleteProductByAdmin.data = {};
      })
      .addCase(actionDeleteProductByAdmin.fulfilled, (state, action) => {
        state.deleteProductByAdmin.loading = false;
        state.deleteProductByAdmin.data = action.payload;
        state.deleteProductByAdmin.error = '';
      });
  }
});

export default reducer;

export {
  actionGetProduct,
  actionAddNewProduct,
  actionDeleteProduct,
  actionUpdateProduct,
  actionGetDetailProduct,
  actionGetProductById,
  actionDeleteProductByAdmin
};
