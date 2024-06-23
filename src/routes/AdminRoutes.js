import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import AdminLayout from 'layout/AdminLayout';
import InventoryPage from 'pages/inventory/index';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/admin/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Profile = Loadable(lazy(() => import('pages/profile')));
const Category = Loadable(lazy(() => import('pages/admin/Category')));
const Brand = Loadable(lazy(() => import('pages/admin/Brand')));
const Product = Loadable(lazy(() => import('pages/product')));
const Warehouse = Loadable(lazy(() => import('pages/warehouse')));
const WarehouseReceipt = Loadable(lazy(() => import('pages/warehouse-receipt')));
const WarehouseExport = Loadable(lazy(() => import('pages/warehouse-export')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const Inventory = Loadable(lazy(() => import('pages/inventory')));
// ==============================|| MAIN ROUTING ||============================== //

const AdminRoutes = {
  path: '/admin',
  element: <AdminLayout />,
  children: [
    {
      path: '/admin',
      element: <DashboardDefault />
    },
    {
      path: '/admin/profile',
      element: <Profile />
    },
    {
      path: '/admin/category',
      element: <Category />
    },
    {
      path: '/admin/brand',
      element: <Brand />
    }
  ]
};

export default AdminRoutes;
