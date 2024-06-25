// assets
import {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ImportOutlined,
  ExportOutlined,
  InventoryIcon
} from '@ant-design/icons';
// icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
const icons = {
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ImportOutlined,
  ExportOutlined,
  Inventory2OutlinedIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboardAdmin = {
  id: 'group-dashboard',
  title: 'Navigation123',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/admin',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      url: '/admin/profile',
      icon: icons.UserOutlined,
      breadcrumbs: true
    },
    {
      id: 'category',
      title: 'Category',
      type: 'item',
      url: '/admin/category',
      icon: icons.ShoppingCartOutlined,
      breadcrumbs: true
    },
    {
      id: 'brand',
      title: 'Brand',
      type: 'item',
      url: '/admin/brand',
      icon: icons.HomeOutlined,
      breadcrumbs: true
    },
    {
      id: 'user',
      title: 'User',
      type: 'item',
      url: '/admin/user',
      icon: icons.ImportOutlined,
      breadcrumbs: true
    }
    // {
    //   id: 'warehouse-export',
    //   title: 'Warehouse Export',
    //   type: 'item',
    //   url: '/dashboard/warehouse-export',
    //   icon: icons.ExportOutlined,
    //   breadcrumbs: true
    // },
    // {
    //   id: 'inventory',
    //   title: 'Inventory',
    //   type: 'item',
    //   url: '/dashboard/inventory',
    //   icon: icons.Inventory2OutlinedIcon,
    //   breadcrumbs: true
    // }
  ]
};

export default dashboardAdmin;
