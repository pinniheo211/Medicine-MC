// assets
import { DashboardOutlined, UserOutlined, HomeOutlined, ShoppingCartOutlined, ImportOutlined, ExportOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ImportOutlined,
  ExportOutlined
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
      id: 'product',
      title: 'Products',
      type: 'item',
      url: '/dashboard/products',
      icon: icons.ShoppingCartOutlined,
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
      id: 'warehouse-receipt',
      title: 'Warehouse Receipt',
      type: 'item',
      url: '/dashboard/warehouse-recipes',
      icon: icons.ImportOutlined,
      breadcrumbs: true
    },
    {
      id: 'warehouse-export',
      title: 'Warehouse Export',
      type: 'item',
      url: '/dashboard/warehouse-export',
      icon: icons.ExportOutlined,
      breadcrumbs: true
    }
  ]
};

export default dashboard;
