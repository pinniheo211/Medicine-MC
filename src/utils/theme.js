import { createTheme } from '@mui/material';

export const ThemeMdx = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '100%'
        }
      }
    }
  }
});
