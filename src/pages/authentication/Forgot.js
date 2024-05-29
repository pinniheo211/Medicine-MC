import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import AuthForgot from './auth-forms/AuthForgot';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// ================================|| LOGIN ||================================ //

const Forgot = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <Typography variant="h3">Forgot Password</Typography>
          <a href="/login">
            <ArrowBackIcon />
          </a>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthForgot />
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Forgot;
