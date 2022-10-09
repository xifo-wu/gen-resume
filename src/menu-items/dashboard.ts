import Dashboard from '@mui/icons-material/Dashboard';

// constant
const icons = { Dashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'default',
      title: '控制台',
      type: 'item',
      url: '/dashboard',
      icon: icons.Dashboard,
      breadcrumbs: false,
    },
  ],
};

export default dashboard;
