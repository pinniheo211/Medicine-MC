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
const actionImportProduct = createAsyncThunk('warehouse/import-product', async (data) => {
  try {
    const res = await warehouseService.docreateImportProduct(data);
    if (res.status === 200) {
      toast.success('Create Import Record successfully!');
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    return error.response.data;
  }
});

const actionExportProduct = createAsyncThunk('warehouse/export-product', async (data) => {
  try {
    const res = await warehouseService.docreateExportProduct(data);
    if (res.status === 200) {
      toast.success('Create Export Record successfully!');
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
const actionGetImport = createAsyncThunk('warehouse/get-import-product', async () => {
  try {
    const res = await warehouseService.getImportProduct();
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    return error.response.data;
  }
});
const actionGetExport = createAsyncThunk('warehouse/get-export-product', async () => {
  try {
    const res = await warehouseService.getExportProduct();
    if (res.status === 200) {
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    return error.response.data;
  }
});

const actionGetDesExport = createAsyncThunk('warehouse/get-des-export-product', async (id) => {
  try {
    const res = await warehouseService.getDescriptionExport(id);
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

const actionGetDesImport = createAsyncThunk('warehouse/get-des-import-product', async (id) => {
  try {
    const res = await warehouseService.getDescriptionImport(id);
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
    },
    importProduct: {
      loading: false,
      data: null,
      error: ''
    },
    exportProduct: {
      loading: false,
      data: null,
      error: ''
    },
    getImportProduct: {
      loading: false,
      data: null,
      error: ''
    },
    getExportProduct: {
      loading: false,
      data: null,
      error: ''
    },
    getDesExportProduct: {
      loading: false,
      data: null,
      error: ''
    },
    getDesImportProducts: {
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
      })
      .addCase(actionImportProduct.pending, (state) => {
        state.importProduct.loading = true;
      })
      .addCase(actionImportProduct.rejected, (state, action) => {
        state.importProduct.loading = false;
        state.importProduct.error = action.payload;
        state.importProduct.data = {};
      })
      .addCase(actionImportProduct.fulfilled, (state, action) => {
        state.importProduct.loading = false;
        state.importProduct.data = action.payload;
        state.importProduct.error = '';
      })
      .addCase(actionExportProduct.pending, (state) => {
        state.exportProduct.loading = true;
      })
      .addCase(actionExportProduct.rejected, (state, action) => {
        state.exportProduct.loading = false;
        state.exportProduct.error = action.payload;
        state.exportProduct.data = {};
      })
      .addCase(actionExportProduct.fulfilled, (state, action) => {
        state.exportProduct.loading = false;
        state.exportProduct.data = action.payload;
        state.exportProduct.error = '';
      })
      .addCase(actionGetImport.pending, (state) => {
        state.getImportProduct.loading = true;
      })
      .addCase(actionGetImport.rejected, (state, action) => {
        state.getImportProduct.loading = false;
        state.getImportProduct.error = action.payload;
        state.getImportProduct.data = {};
      })
      .addCase(actionGetImport.fulfilled, (state, action) => {
        state.getImportProduct.loading = false;
        state.getImportProduct.data = action.payload;
        state.getImportProduct.error = '';
      })
      .addCase(actionGetExport.pending, (state) => {
        state.getExportProduct.loading = true;
      })
      .addCase(actionGetExport.rejected, (state, action) => {
        state.getExportProduct.loading = false;
        state.getExportProduct.error = action.payload;
        state.getExportProduct.data = {};
      })
      .addCase(actionGetExport.fulfilled, (state, action) => {
        state.getExportProduct.loading = false;
        state.getExportProduct.data = action.payload;
        state.getExportProduct.error = '';
      })
      .addCase(actionGetDesExport.pending, (state) => {
        state.getDesExportProduct.loading = true;
      })
      .addCase(actionGetDesExport.rejected, (state, action) => {
        state.getDesExportProduct.loading = false;
        state.getDesExportProduct.error = action.payload;
        state.getDesExportProduct.data = {};
      })
      .addCase(actionGetDesExport.fulfilled, (state, action) => {
        state.getDesExportProduct.loading = false;
        state.getDesExportProduct.data = action.payload;
        state.getDesExportProduct.error = '';
      })
      .addCase(actionGetDesImport.pending, (state) => {
        state.getDesImportProducts.loading = true;
      })
      .addCase(actionGetDesImport.rejected, (state, action) => {
        state.getDesImportProducts.loading = false;
        state.getDesImportProducts.error = action.payload;
        state.getDesImportProducts.data = {};
      })
      .addCase(actionGetDesImport.fulfilled, (state, action) => {
        state.getDesImportProducts.loading = false;
        state.getDesImportProducts.data = action.payload;
        state.getDesImportProducts.error = '';
      });
  }
});

export default reducer;

export {
  actionGetWarehouse,
  actionDeleteWarehouse,
  actionDoCreateWarehouse,
  actionGetDescriptionWarehouse,
  actionUpdateWarehouse,
  actionImportProduct,
  actionExportProduct,
  actionGetImport,
  actionGetExport,
  actionGetDesExport,
  actionGetDesImport
};
