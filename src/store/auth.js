import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from './api/index';
import { toast } from 'react-toastify';

const actionRegister = createAsyncThunk('auth/register', async (data) => {
  try {
    const res = await AuthService.register(data);
    if (res.status === 200) {
      toast.success(res?.data?.message);
      return res.data;
    } else {
      console.log('bug');
      toast(res?.data?.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.message || error.message;
    console.log(message);
    return message;
  }
});

const { reducer } = createSlice({
  name: 'auth',
  initialState: {
    register: {
      loading: false,
      data: null,
      error: ''
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionRegister.pending, (state) => {
        state.register.loading = true;
      })
      .addCase(actionRegister.rejected, (state, action) => {
        state.register.loading = false;
        state.register.error = action.payload;
        state.register.data = {};
      })
      .addCase(actionRegister.fulfilled, (state, action) => {
        state.register.loading = false;
        state.register.data = action.payload;
        state.register.error = '';
      });
  }
});

export default reducer;

export { actionRegister };
