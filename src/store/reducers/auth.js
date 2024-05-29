import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../api/index';
import { toast } from 'react-toastify';

const Redirect = () => {
  return (
    <div className="flex space-x-2 items-center">
      <span className="text-sm text-gray-500">Check your email </span>
      <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank">
        <span className="text-xs border-b border-blue-600 text-blue-600 mr-2 cursor-pointer">Go To Email</span>
      </a>
    </div>
  );
};

const actionRegister = createAsyncThunk('user/register', async (data) => {
  try {
    const res = await AuthService.register(data);
    if (res.status === 200) {
      toast.success(res?.data?.mes);
      return res.data;
    } else {
      toast.error(res?.data?.message);
      return [];
    }
  } catch (error) {
    const message = error.response.data?.mes || error.message;
    toast.error(message);
    return message;
  }
});

const actionLogin = createAsyncThunk('user/login', async (data) => {
  try {
    const res = await AuthService.login(data);
    if (res.status === 200) {
      toast.success('login successful');
      return res.data;
    } else {
      toast.error('something went wrong');
      return [];
    }
  } catch (error) {
    debugger;
    const message = error.response.data?.mes || error.message;

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

const actionForgotPass = createAsyncThunk('auth/user/forgot', async (email) => {
  const id = toast.loading('Please wait...');

  try {
    const res = await AuthService.forgotPass(email);
    if (res.status === 200) {
      toast.update(id, {
        render: <Redirect />,
        type: 'success',
        isLoading: false,
        autoClose: 2500
      });
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    const message = error.response.data?.mes || error.message;
    toast.update(id, {
      render: message,
      type: 'error',
      isLoading: false,
      autoClose: 2500
    });
    return error.response.data;
  }
});

const actionResetPass = createAsyncThunk('auth/user/reset', async (data) => {
  try {
    const res = await AuthService.resetPass(data);
    if (res.status === 200) {
      debugger;
      toast.success(res?.data?.mes);
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    const message = error.response.data?.mes || error.message;
    toast.error('Link Change expired password!');
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
    },
    forgot: {
      loading: false,
      data: null,
      error: ''
    },
    reset: {
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
      })
      .addCase(actionForgotPass.pending, (state) => {
        state.forgot.loading = true;
      })
      .addCase(actionForgotPass.rejected, (state, action) => {
        state.forgot.loading = false;
        state.forgot.error = action.payload;
        state.forgot.data = {};
      })
      .addCase(actionForgotPass.fulfilled, (state, action) => {
        state.forgot.loading = false;
        state.forgot.data = action.payload;
        state.forgot.error = '';
      })
      .addCase(actionResetPass.pending, (state) => {
        state.reset.loading = true;
      })
      .addCase(actionResetPass.rejected, (state, action) => {
        state.reset.loading = false;
        state.reset.error = action.payload;
        state.reset.data = {};
      })
      .addCase(actionResetPass.fulfilled, (state, action) => {
        state.reset.loading = false;
        state.reset.data = action.payload;
        state.reset.error = '';
      });
  }
});

export default reducer;

export { actionRegister, actionLogin, actionGetUser, actionForgotPass, actionResetPass };
