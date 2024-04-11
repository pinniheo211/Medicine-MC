import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../api/index';
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

const actionLogin = createAsyncThunk('auth/login', async (data) => {
  try {
    const res = await AuthService.login(data);
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
    toast.error(message);

    return message;
  }
});

const actionGetUser = createAsyncThunk('auth/user', async () => {
  try {
    const res = await AuthService.getUser();
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
  name: 'auth',
  initialState: {
    register: {
      loading: false,
      data: null,
      error: ''
    },
    login: {
      loading: false,
      data: null,
      error: ''
    },
    user: {
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
      })
      .addCase(actionLogin.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(actionLogin.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
        state.login.data = {};
      })
      .addCase(actionLogin.fulfilled, (state, action) => {
        state.login.loading = false;
        state.login.data = action.payload;
        state.login.error = '';
      })
      .addCase(actionGetUser.pending, (state) => {
        state.user.loading = true;
      })
      .addCase(actionGetUser.rejected, (state, action) => {
        state.user.loading = false;
        state.user.error = action.payload;
        state.user.data = {};
      })
      .addCase(actionGetUser.fulfilled, (state, action) => {
        state.user.loading = false;
        state.user.data = action.payload;
        state.user.error = '';
      });
  }
});

export default reducer;

export { actionRegister, actionLogin, actionGetUser };
