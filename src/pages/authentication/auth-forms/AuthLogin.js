import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SCHEMA_LOGIN } from 'utils/schema';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Divider, Grid, Stack, Typography } from '@mui/material';

// third party

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { actionLogin } from 'store/reducers/auth';
import { renderRouterAccept } from 'utils/helper';
import { useLocation } from 'react-router-dom';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const [checked, setChecked] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: null,
      password: null
    },
    resolver: yupResolver(SCHEMA_LOGIN)
  });
  const onSubmit = (data) => {
    const loginData = {
      email: data?.email,
      password: data?.password
    };

    dispatch(actionLogin(loginData)).then((res) => {
      if (res?.payload?.err === 0) {
        localStorage.setItem('access_token', res?.payload?.access_token);
        navigate('/');
      }
    });
  };

  useEffect(() => {
    const user = localStorage.getItem('access_token');
    if (user && renderRouterAccept.includes(location.pathname)) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth error={Boolean(errors.email)} helperText={errors.email?.message || ''} label="Email" />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  fullWidth
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message || ''}
                  label="Password"
                />
              )}
            />
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}></Stack>
        </Grid>

        <Grid item xs={12}>
          <AnimateButton>
            <button
              // disabled={loading}
              className="disabled:cursor-not-allowed disabled:opacity-50 w-full py-3 rounded-lg bg-qyellow text-white"
            >
              Login
            </button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthLogin;
