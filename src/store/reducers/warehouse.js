import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { warehouseService } from '../api/index';
import { toast } from 'react-toastify';

const actionGetWarehouse = createAsyncThunk('warehouse/getWareHouse', async () => {
  try {
    const res = await warehouseService.getWarehouse();
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

const actionGetDescriptionWarehouse = createAsyncThunk('warehouse/getDescriptionWareHouse', async (id) => {
  try {
    const res = await warehouseService.getDescriptionWarehouse(id);
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

const actionDoCreateWarehouse = createAsyncThunk('warehouse/createWarehouse', async (data) => {
  try {
    const res = await warehouseService.doCreateWarehouse(data);
    if (res.status === 200) {
      toast.success('Created Warehouse');
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

const actionUpdateWarehouse = createAsyncThunk('warehouse/updateWarehouse', async (data) => {
  try {
    const res = await warehouseService.updateWarehouse(data);
    if (res.status === 200) {
      toast.success('Updated Warehouse');
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
  name: 'warehouse',
  initialState: {
    getwarehouse: {
      loading: false,
      data: null,
      error: ''
    },
    getDesWarehouse: {
      loading: false,
      data: null,
      error: ''
    },
    deleteWarehouse: {
      loading: false,
      data: null,
      error: ''
    },
    createWarehouse: {
      loading: false,
      data: null,
      error: ''
    },
    updateWarehouse: {
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
      })
      .addCase(actionDoCreateWarehouse.pending, (state) => {
        state.createWarehouse.loading = true;
      })
      .addCase(actionDoCreateWarehouse.rejected, (state, action) => {
        state.createWarehouse.loading = false;
        state.createWarehouse.error = action.payload;
        state.createWarehouse.data = {};
      })
      .addCase(actionDoCreateWarehouse.fulfilled, (state, action) => {
        state.createWarehouse.loading = false;
        state.createWarehouse.data = action.payload;
        state.createWarehouse.error = '';
      })
      .addCase(actionGetDescriptionWarehouse.pending, (state) => {
        state.getDesWarehouse.loading = true;
      })
      .addCase(actionGetDescriptionWarehouse.rejected, (state, action) => {
        state.getDesWarehouse.loading = false;
        state.getDesWarehouse.error = action.payload;
        state.getDesWarehouse.data = {};
      })
      .addCase(actionGetDescriptionWarehouse.fulfilled, (state, action) => {
        state.getDesWarehouse.loading = false;
        state.getDesWarehouse.data = action.payload;
        state.getDesWarehouse.error = '';
      })
      .addCase(actionUpdateWarehouse.pending, (state) => {
        state.updateWarehouse.loading = true;
      })
      .addCase(actionUpdateWarehouse.rejected, (state, action) => {
        state.updateWarehouse.loading = false;
        state.updateWarehouse.error = action.payload;
        state.updateWarehouse.data = {};
      })
      .addCase(actionUpdateWarehouse.fulfilled, (state, action) => {
        state.updateWarehouse.loading = false;
        state.updateWarehouse.data = action.payload;
        state.updateWarehouse.error = '';
      });
  }
});

export default reducer;

export { actionGetWarehouse, actionDeleteWarehouse, actionDoCreateWarehouse, actionGetDescriptionWarehouse, actionUpdateWarehouse };
