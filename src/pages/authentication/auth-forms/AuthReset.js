import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SCHEMA_FORGOT, SCHEMA_LOGIN, SCHEMA_RESET } from 'utils/schema';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// material-ui
import { Divider, Grid, Stack, Typography } from '@mui/material';

// third party

// project import
import FirebaseSocial from './FirebaseSocial';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import { actionForgotPass, actionLogin, actionResetPass } from 'store/reducers/auth';
import { renderRouterAccept } from 'utils/helper';
import { useLocation, useParams } from 'react-router-dom';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthReset = () => {
  const [checked, setChecked] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const token = useParams();
  console.log(token);
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
      password: null
    },
    resolver: yupResolver(SCHEMA_RESET)
  });
  const onSubmit = (data) => {
    const dataReset = {
      password: data?.password,
      token: token?.token
    };
    dispatch(actionResetPass(dataReset)).then((res) => {
      if (res?.payload?.success) {
        navigate('/login');
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
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
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
              className="disabled:cursor-not-allowed disabled:opacity-50 w-full px-5 py-2 text-white font-semibold rounded-lg bg-primary-8"
            >
              Update
            </button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthReset;
