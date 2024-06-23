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

const actionCreateCategory = createAsyncThunk('category/create-category', async (data) => {
  try {
    const res = await CategoryService.createCategory(data);
    if (res.status === 200) {
      toast.success('Category created successfully');
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

const actionDeleteCategory = createAsyncThunk('category/delete-category', async (id) => {
  try {
    const res = await CategoryService.deleteCategory(id);
    if (res.status === 200) {
      toast.success('Delete category successfully');
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

const actionGetDesCategory = createAsyncThunk('category/des-category', async (id) => {
  try {
    const res = await CategoryService.getDesCategory(id);
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

const actionUpdateCategory = createAsyncThunk('category/update-category', async (data) => {
  try {
    const res = await CategoryService.updateCategory(data);
    if (res.status === 200) {
      toast.success('Updated category');
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
    },
    createCategory: {
      loading: false,
      data: null,
      error: ''
    },
    deleteCategory: {
      loading: false,
      data: null,
      error: ''
    },
    getDesCategory: {
      loading: false,
      data: null,
      error: ''
    },
    updateCategory: {
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
      })
      .addCase(actionCreateCategory.pending, (state) => {
        state.createCategory.loading = true;
      })
      .addCase(actionCreateCategory.rejected, (state, action) => {
        state.createCategory.loading = false;
        state.createCategory.error = action.payload;
        state.createCategory.data = {};
      })
      .addCase(actionCreateCategory.fulfilled, (state, action) => {
        state.createCategory.loading = false;
        state.createCategory.data = action.payload;
        state.createCategory.error = '';
      })
      .addCase(actionDeleteCategory.pending, (state) => {
        state.deleteCategory.loading = true;
      })
      .addCase(actionDeleteCategory.rejected, (state, action) => {
        state.deleteCategory.loading = false;
        state.deleteCategory.error = action.payload;
        state.deleteCategory.data = {};
      })
      .addCase(actionDeleteCategory.fulfilled, (state, action) => {
        state.deleteCategory.loading = false;
        state.deleteCategory.data = action.payload;
        state.deleteCategory.error = '';
      })
      .addCase(actionGetDesCategory.pending, (state) => {
        state.getDesCategory.loading = true;
      })
      .addCase(actionGetDesCategory.rejected, (state, action) => {
        state.getDesCategory.loading = false;
        state.getDesCategory.error = action.payload;
        state.getDesCategory.data = {};
      })
      .addCase(actionGetDesCategory.fulfilled, (state, action) => {
        state.getDesCategory.loading = false;
        state.getDesCategory.data = action.payload;
        state.getDesCategory.error = '';
      })
      .addCase(actionUpdateCategory.pending, (state) => {
        state.updateCategory.loading = true;
      })
      .addCase(actionUpdateCategory.rejected, (state, action) => {
        state.updateCategory.loading = false;
        state.updateCategory.error = action.payload;
        state.updateCategory.data = {};
      })
      .addCase(actionUpdateCategory.fulfilled, (state, action) => {
        state.updateCategory.loading = false;
        state.updateCategory.data = action.payload;
        state.updateCategory.error = '';
      });
  }
});

export default reducer;

export { actionGetCategory, actionCreateCategory, actionDeleteCategory, actionGetDesCategory, actionUpdateCategory };
