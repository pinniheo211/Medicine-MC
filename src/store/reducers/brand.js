import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BrandService } from '../api/index';
import { toast } from 'react-toastify';

const actionGetBrand = createAsyncThunk('brand/getBrand', async () => {
  try {
    const res = await BrandService.getAllBrand();
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

const actionDeleteBrand = createAsyncThunk('brand/delete-brand', async (id) => {
  try {
    const res = await BrandService.deleteBrand(id);
    if (res.status === 200) {
      toast.success('Delete Brand successfully');
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

const actionCreateBrand = createAsyncThunk('brand/create-brand', async (data) => {
  try {
    const res = await BrandService.createBrand(data);
    if (res.status === 200) {
      toast.success('Delete Brand successfully');
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
const actionGetDesBrand = createAsyncThunk('brand/get-des-brand', async (id) => {
  try {
    const res = await BrandService.getDesBrand(id);
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

const actionUpdateBrand = createAsyncThunk('brand/update-brand', async (data) => {
  try {
    const res = await BrandService.updateBrand(data);
    if (res.status === 200) {
      toast.success('Updated Brand successfully');
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
  name: 'brand',
  initialState: {
    getBrand: {
      loading: false,
      data: null,
      error: ''
    },
    deleteBrand: {
      loading: false,
      data: null,
      error: ''
    },
    createBrand: {
      loading: false,
      data: null,
      error: ''
    },
    getDesBrand: {
      loading: false,
      data: null,
      error: ''
    },
    updateBrand: {
      loading: false,
      data: null,
      error: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetBrand.pending, (state) => {
        state.getBrand.loading = true;
      })
      .addCase(actionGetBrand.rejected, (state, action) => {
        state.getBrand.loading = false;
        state.getBrand.error = action.payload;
        state.getBrand.data = {};
      })
      .addCase(actionGetBrand.fulfilled, (state, action) => {
        state.getBrand.loading = false;
        state.getBrand.data = action.payload;
        state.getBrand.error = '';
      })
      .addCase(actionDeleteBrand.pending, (state) => {
        state.deleteBrand.loading = true;
      })
      .addCase(actionDeleteBrand.rejected, (state, action) => {
        state.deleteBrand.loading = false;
        state.deleteBrand.error = action.payload;
        state.deleteBrand.data = {};
      })
      .addCase(actionDeleteBrand.fulfilled, (state, action) => {
        state.deleteBrand.loading = false;
        state.deleteBrand.data = action.payload;
        state.deleteBrand.error = '';
      })
      .addCase(actionCreateBrand.pending, (state) => {
        state.createBrand.loading = true;
      })
      .addCase(actionCreateBrand.rejected, (state, action) => {
        state.createBrand.loading = false;
        state.createBrand.error = action.payload;
        state.createBrand.data = {};
      })
      .addCase(actionCreateBrand.fulfilled, (state, action) => {
        state.createBrand.loading = false;
        state.createBrand.data = action.payload;
        state.createBrand.error = '';
      })
      .addCase(actionGetDesBrand.pending, (state) => {
        state.getDesBrand.loading = true;
      })
      .addCase(actionGetDesBrand.rejected, (state, action) => {
        state.getDesBrand.loading = false;
        state.getDesBrand.error = action.payload;
        state.getDesBrand.data = {};
      })
      .addCase(actionGetDesBrand.fulfilled, (state, action) => {
        state.getDesBrand.loading = false;
        state.getDesBrand.data = action.payload;
        state.getDesBrand.error = '';
      })
      .addCase(actionUpdateBrand.pending, (state) => {
        state.updateBrand.loading = true;
      })
      .addCase(actionUpdateBrand.rejected, (state, action) => {
        state.updateBrand.loading = false;
        state.updateBrand.error = action.payload;
        state.updateBrand.data = {};
      })
      .addCase(actionUpdateBrand.fulfilled, (state, action) => {
        state.updateBrand.loading = false;
        state.updateBrand.data = action.payload;
        state.updateBrand.error = '';
      });
  }
});

export default reducer;

export { actionGetBrand, actionDeleteBrand, actionCreateBrand, actionGetDesBrand, actionUpdateBrand };
