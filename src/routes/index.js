import { useRoutes, Navigate } from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import NotFound from './NotFound';
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    MainRoutes,
    LoginRoutes,
    {
      path: '*',
      element: <Navigate to="/404" />
    },
    {
      path: '/404',
      element: <NotFound />
    }
  ]);
}
