import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { warehouseService } from '../api/index';
import { toast } from 'react-toastify';

const actionGetWarehouse = createAsyncThunk('warehouse/getWareHouse', async (id) => {
  try {
    const res = await warehouseService.getWarehouse(id);
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

const actionDeleteWarehouse = createAsyncThunk('warehouse/deleteWarehouse', async (id) => {
  try {
    const res = await warehouseService.deleteWarehouse(id);
    if (res.status === 200) {
      toast.success(res.data.message);
      return res.data;
    } else {
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
  name: 'warehouse',
  initialState: {
    getwarehouse: {
      loading: false,
      data: null,
      error: ''
    },
    deleteWarehouse: {
      loading: false,
      data: null,
      error: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionGetWarehouse.pending, (state) => {
        state.getwarehouse.loading = true;
      })
      .addCase(actionGetWarehouse.rejected, (state, action) => {
        state.getwarehouse.loading = false;
        state.getwarehouse.error = action.payload;
        state.getwarehouse.data = {};
      })
      .addCase(actionGetWarehouse.fulfilled, (state, action) => {
        state.getwarehouse.loading = false;
        state.getwarehouse.data = action.payload;
        state.getwarehouse.error = '';
      })
      .addCase(actionDeleteWarehouse.pending, (state) => {
        state.deleteWarehouse.loading = true;
      })
      .addCase(actionDeleteWarehouse.rejected, (state, action) => {
        state.deleteWarehouse.loading = false;
        state.deleteWarehouse.error = action.payload;
        state.deleteWarehouse.data = {};
      })
      .addCase(actionDeleteWarehouse.fulfilled, (state, action) => {
        state.deleteWarehouse.loading = false;
        state.deleteWarehouse.data = action.payload;
        state.deleteWarehouse.error = '';
      });
  }
});

export default reducer;

export { actionGetWarehouse, actionDeleteWarehouse };
