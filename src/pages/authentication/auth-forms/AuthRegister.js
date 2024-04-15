// import { useState } from 'react';

// material-ui
import { Divider, FormControl, Grid, Link, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
// third party

// project import
import FirebaseSocial from './FirebaseSocial';

// assets
import { useForm } from 'react-hook-form';

import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SCHEMA_REGISTER } from 'utils/schema';
import { useDispatch } from 'react-redux';
import { actionRegister } from 'store/reducers/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { renderRouterAccept } from 'utils/helper';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth.register);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: null,
      email: null,
      phone: null,
      company: null,
      password: null
    },
    resolver: yupResolver(SCHEMA_REGISTER)
  });

  const onSubmit = (data) => {
    const registerData = {
      username: data?.name,
      email: data?.email,
      phone: data?.phone,
      company: data?.company,
      password: data?.password
    };

    dispatch(actionRegister(registerData)).then((res) => {
      if (res?.payload?.err === 0) {
        navigate('/login');
      }
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('access_token'));
    if (user && renderRouterAccept.includes(location.pathname)) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth error={Boolean(errors.name)} helperText={errors.name?.message || ''} label="Name" />
                )}
              />
            </Stack>
          </Grid>

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
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth error={Boolean(errors.phone)} helperText={errors.phone?.message || ''} label="Phone" />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={Boolean(errors.company)}
                    helperText={errors.company?.message || ''}
                    label="Company"
                  />
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
                    fullWidth
                    type="password"
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message || ''}
                    label="Password"
                    placeholder="******"
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <button
              disabled={loading}
              className="disabled:cursor-not-allowed disabled:opacity-50 w-full py-3 rounded-lg bg-qyellow text-white"
            >
              Create Account
            </button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthRegister;
