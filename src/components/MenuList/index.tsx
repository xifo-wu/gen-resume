import { useMemo } from 'react';
import { Typography } from '@mui/material';

// 该组件学习自 https://github.com/codedthemes/berry-free-react-admin-template
// project imports
import NavGroup from './NavGroup';
import MenuListContext from './MenuListContext';
import menuItem from '@/menu-items';
import type { MenuItem } from './types';

interface MenuListProps {
  onMenuClick: (id: string, item: MenuItem) => void;
}

export { MenuItem };

const MenuList = ({ onMenuClick }: MenuListProps) => {
  const menuContextValue = useMemo(
    () => ({
      onMenuClick,
    }),
    [],
  );

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <MenuListContext.Provider value={menuContextValue}>{navItems}</MenuListContext.Provider>;
};

export default MenuList;
