// import { useState } from 'react';

// material-ui
import { Divider, Grid, Link, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
// third party

// project import
import FirebaseSocial from './FirebaseSocial';

// assets
import { useForm } from 'react-hook-form';

import { Controller } from 'react-hook-form';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { SCHEMA_REGISTER } from 'utils/schema';
import { useDispatch } from 'react-redux';
import { actionRegister } from 'store/reducers/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { renderRouterAccept } from 'utils/helper';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth.register);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState([false, false, false]);
  const handleClickShowPassword = (index) => {
    setShowPassword((prevShowPasswords) => {
      const newShowPasswords = [...prevShowPasswords];
      newShowPasswords[index] = !prevShowPasswords[index];
      return newShowPasswords;
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstname: '',
      lastname: '',
      password: '',
      email: '',
      mobile: ''
    },
    resolver: yupResolver(SCHEMA_REGISTER)
  });

  const onSubmit = (data) => {
    const registerData = {
      firstname: data?.firstname,
      lastname: data?.lastname,
      password: data?.password,
      email: data?.email,
      mobile: data?.mobile
    };

    dispatch(actionRegister(registerData)).then((res) => {
      if (res?.payload?.sucess) {
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
                name="firstname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={Boolean(errors.firstname)}
                    helperText={errors.firstname?.message || ''}
                    label="First Name"
                  />
                )}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    error={Boolean(errors.lastname)}
                    helperText={errors.lastname?.message || ''}
                    label="Last Name"
                  />
                )}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password*</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <OutlinedInput
                      {...field}
                      id="outlined-adornment-password"
                      type={showPassword[0] ? 'text' : 'password'}
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message || ''}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword(0)}
                            onMouseDown={(event) => event.preventDefault()}
                            edge="end"
                          >
                            {showPassword[0] ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password*"
                    />
                  )}
                />
              </FormControl>
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
                name="mobile"
                control={control}
                render={({ field }) => (
                  <TextField {...field} fullWidth error={Boolean(errors.mobile)} helperText={errors.mobile?.message || ''} label="Mobile" />
                )}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <button
              disabled={loading}
              className="disabled:cursor-not-allowed disabled:opacity-50 w-full px-5 py-2 text-white font-semibold rounded-lg bg-primary-8"
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
