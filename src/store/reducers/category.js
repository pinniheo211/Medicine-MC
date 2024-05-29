import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoryService, productService } from '../api/index';
import { toast } from 'react-toastify';

const actionGetCategory = createAsyncThunk('category/getCategory', async () => {
  try {
    const res = await CategoryService.getAllCategory();
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
  name: 'category',
  initialState: {
    getCategory: {
      loading: false,
      data: null,
      error: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetCategory.pending, (state) => {
        state.getCategory.loading = true;
      })
      .addCase(actionGetCategory.rejected, (state, action) => {
        state.getCategory.loading = false;
        state.getCategory.error = action.payload;
        state.getCategory.data = {};
      })
      .addCase(actionGetCategory.fulfilled, (state, action) => {
        state.getCategory.loading = false;
        state.getCategory.data = action.payload;
        state.getCategory.error = '';
      });
  }
});

export default reducer;

export { actionGetCategory };
