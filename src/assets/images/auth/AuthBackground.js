// material-ui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
// ==============================|| AUTH BLUR BACK SVG ||============================== //

const AuthBackground = () => {
  const theme = useTheme();
  return (
    <Box sx={{ position: 'absolute', filter: 'blur(18px)', zIndex: -1, bottom: '10%', left: '0%' }}>
      <img className="w-[500px]" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8v51wPMALYp4KNGuI61NqTl_KCLCkd8zU5g&s" />
    </Box>
  );
};

export default AuthBackground;
