import { Paper } from '@mui/material';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SCHEMA_LOGIN } from 'utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadImage from 'components/UploadImage';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
});

const ProfilePage = () => {
  const { data: dataProfile } = useSelector((state) => state.auth.user);
  console.log(dataProfile);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: null,
      email: null,
      phone: null,
      company: null
    },
    resolver: yupResolver(SCHEMA_LOGIN)
  });

  useEffect(() => {
    setValue('username', dataProfile?.userData?.username);
    setValue('email', dataProfile?.userData?.email);
    setValue('phone', dataProfile?.userData?.phone);
    setValue('company', dataProfile?.userData?.company);
  }, []);
  return (
    <div className="w-full">
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Paper elevation={3}>
            <div className="py-10  flex justify-center gap-5 flex-col items-center">
              <Avatar src="/" sx={{ width: 100, height: 100 }}>
                {dataProfile?.userData?.username}
              </Avatar>
              <span className="text-xs text-gray-600 w-[200px] text-center">Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb</span>
              <div className="grid grid-cols-2 gap-5">
                <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
                  Upload file
                  <VisuallyHiddenInput type="file" />
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={7}>
          <Paper elevation={3}>
            <div className="px-5 py-10">
              <h1 className="text-xl font-bold mb-10">Edit Profile</h1>
              <div className="grid grid-cols-2 gap-5">
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={Boolean(errors.username)}
                      helperText={errors.username?.message || ''}
                      label="Username"
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth error={Boolean(errors.email)} helperText={errors.email?.message || ''} label="Email" />
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth error={Boolean(errors.phone)} helperText={errors.phone?.message || ''} label="Phone" />
                  )}
                />
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
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
