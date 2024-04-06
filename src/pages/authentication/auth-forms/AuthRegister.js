// import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Divider, FormControl, Grid, Link, Stack, Typography } from '@mui/material';

import { yupResolver } from '@hookform/resolvers/yup';
// third party

// project import
import FirebaseSocial from './FirebaseSocial';
// import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { useForm } from 'react-hook-form';

import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { SCHEMA_REGISTER } from 'utils/schema';
import { useDispatch } from 'react-redux';
import { actionRegister } from 'store/auth';
// import { useRouter } from 'next/navigation';

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  // const [level, setLevel] = useState();
  // const router = useRouter;
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: null,
      email: null,
      password: null
    },
    resolver: yupResolver(SCHEMA_REGISTER)
  });

  // const changePassword = () => {
  //   const temp = strengthIndicator(watch('password'));
  //   setLevel(strengthColor(temp));
  // };
  console.log(watch('password'));
  const onSubmit = (data) => {
    const registerData = {
      name: data?.name,
      email: data?.email,
      password: data?.password
    };

    dispatch(actionRegister(registerData)).then((res) => {
      if (res?.payload?.err === 0) {
        // localStorage.setItem("token", JSON.stringify(res?.payload?.userData));
        // router.push('/dashboard/default');
      }
    });
  };

  // useEffect(() => {
  //   changePassword('');
  // }, []);
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
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>{/* <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} /> */}</Grid>
                <Grid item>
                  {/* <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography> */}
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              By Signing up, you agree to our &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Terms of Service
              </Link>
              &nbsp; and &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                Privacy Policy
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <button className="w-full py-3 rounded-lg bg-qyellow text-white">Create Account</button>
          </Grid>
          <Grid item xs={12}>
            <Divider>
              <Typography variant="caption">Sign up with</Typography>
            </Divider>
          </Grid>
          <Grid item xs={12}>
            <FirebaseSocial />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthRegister;
