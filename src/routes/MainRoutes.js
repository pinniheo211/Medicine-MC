import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import InventoryPage from 'pages/inventory/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Profile = Loadable(lazy(() => import('pages/profile')));
const Product = Loadable(lazy(() => import('pages/product')));
const Warehouse = Loadable(lazy(() => import('pages/warehouse')));
const WarehouseReceipt = Loadable(lazy(() => import('pages/warehouse-receipt')));
const WarehouseExport = Loadable(lazy(() => import('pages/warehouse-export')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Inventory = Loadable(lazy(() => import('pages/inventory')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/profile',
      element: <Profile />
    },
    {
      path: '/dashboard/ware-house',
      element: <Warehouse />
    },
    {
      path: '/dashboard/products',
      element: <Product />
    },
    {
      path: '/dashboard/inventory',
      element: <Inventory />
    },
    {
      path: '/dashboard/warehouse-recipes',
      element: <WarehouseReceipt />
    },
    {
      path: '/dashboard/warehouse-export',
      element: <WarehouseExport />
    },
    {
      path: '/dashboard/products',
      element: <Product />
    },
    {
      path: '/dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
