import React, { useEffect } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { apiPut } from '@/api';

// Components
import { Reorder } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ModuleItemCard from './ModuleItemCard';

// Hooks
import { useTheme, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useDebounce } from 'react-use';

// Types
import type { DrawerProps } from '@mui/material/Drawer';
import type { ModuleMapKeys } from '@/components/Resume/modules';

// Styles
import styles from './RightSideBarStyles';

// Constant
const drawerWidth = 240;

interface Props {
  modules: string;
  drawerOpen?: boolean;
  window?: () => Window;
  drawerToggle?: DrawerProps['onClose'];
}

// 右侧菜单
// 用于编辑模块、模块排序等
const RightSideBar = (props: Props) => {
  const { window: windowProps, modules = '', drawerOpen, drawerToggle } = props;
  const theme = useTheme();
  const router = useRouter();
  const { query } = router;
  const [reordered, setReordered] = React.useState(modules);

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const container = windowProps !== undefined ? () => windowProps().document.body : undefined;
  const [debouncedReordered, setDebouncedReordered] = React.useState('');

  useDebounce(
    () => {
      const reorderFunc = async () => {
        const { error } = await apiPut<any, any>({
          url: `/api/v1/resumes/${query.slug}`,
          data: {
            moduleOrder: reordered,
          }
        });

        if (error) {
          toast.error(error.message);
          return
        }
      }

      if (debouncedReordered) {
        reorderFunc();
      }

      setDebouncedReordered(reordered);
    },
    2000,
    [reordered],
  );

  const handleReorder = (newItems: string[]) => {
    setReordered(newItems.join(','));
  };

  const drawer = (
    <Box sx={styles.modulesBox}>
      <Reorder.Group axis="y" onReorder={handleReorder} values={reordered.split(',')}>
        {_.map(reordered.split(','), (item: ModuleMapKeys) => (
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
