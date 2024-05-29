import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import AuthForgot from './auth-forms/AuthForgot';
import AuthReset from './auth-forms/AuthReset';

// ================================|| LOGIN ||================================ //

const Forgot = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">New Password</Typography>
          <a href="/forgot-password">
            <ArrowBackIcon />
          </a>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthReset />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Forgot;
