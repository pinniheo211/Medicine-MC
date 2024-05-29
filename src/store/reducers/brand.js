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

const { reducer } = createSlice({
  name: 'brand',
  initialState: {
    getBrand: {
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
      });
  }
});

export default reducer;

export { actionGetBrand };
