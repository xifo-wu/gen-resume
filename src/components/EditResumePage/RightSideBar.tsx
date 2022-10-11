import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';
import _ from 'lodash';

// Components
import { Reorder } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import ModuleItemCard from './ModuleItemCard';

// Styles
import styles from './RightSideBarStyles';

// Types
import type { DrawerProps } from '@mui/material/Drawer';
import type { ModuleMapKeys } from '@/components/Resume/modules';

// Constant
import modulesItems from '@/components/Resume/modules';
const drawerWidth = 240;

interface Props {
  modules: ModuleMapKeys[];
  drawerOpen?: boolean;
  window?: () => Window;
  drawerToggle?: DrawerProps['onClose'];
}

// 右侧菜单
// 用于编辑模块、模块排序等
const RightSideBar = (props: Props) => {
  const { window, modules, drawerOpen, drawerToggle } = props;
  const theme = useTheme();
  const [reordered, setReordered] = React.useState<ModuleMapKeys[]>(modules);

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleReorder = (newItems: ModuleMapKeys[]) => {
    setReordered(newItems);
  };

  const drawer = (
    <Box sx={styles.modulesBox}>
      <Reorder.Group axis="y" onReorder={handleReorder} values={reordered}>
        {_.map(reordered, (item) => (
          <ModuleItemCard key={item} item={item} />
        ))}
      </Reorder.Group>
    </Box>
  );

  return (
    <Box component="nav">
      <Drawer
        anchor="right"
        container={container}
        variant={matchUpMd ? 'persistent' : 'temporary'}
        sx={(theme) => styles.drawerContainer(theme, drawerWidth)}
        ModalProps={{ keepMounted: true }}
        color="inherit"
        open={drawerOpen}
        onClose={drawerToggle}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default RightSideBar;
