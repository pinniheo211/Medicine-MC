// assets
import { DashboardOutlined, UserOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/dashboard/profile',
      icon: icons.UserOutlined,
      breadcrumbs: true
    },
    {
      id: 'warehouse',
      title: 'Warehouse',
      type: 'item',
      url: '/dashboard/ware-house',
      icon: icons.HomeOutlined,
      breadcrumbs: true
    },
    {
      id: 'product',
      title: 'Products',
      type: 'item',
      url: '/dashboard/products',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
