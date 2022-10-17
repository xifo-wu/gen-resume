import React from 'react';
import { toast } from 'react-toastify';
import { apiPut } from '@/api';
import _ from 'lodash';

// Components
import { Reorder } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ModuleItemCard from './ModuleItemCard';
import EducationModalForm from './EducationModalForm';
import ResumeBasicModalForm from './ResumeBasicModalForm';

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
  data: any;
  modules: string;
  drawerOpen?: boolean;
  window?: () => Window;
  drawerToggle?: DrawerProps['onClose'];
}

// 右侧菜单
// 用于编辑模块、模块排序等
const RightSideBar = (props: Props) => {
  const { data, window: windowProps, modules = '', drawerOpen, drawerToggle } = props;
  const theme = useTheme();
  const router = useRouter();
  const { query } = router;
  const [reordered, setReordered] = React.useState(modules);
  const [debouncedReordered, setDebouncedReordered] = React.useState('');

  // Modal 框相关 State
  const [resumeBasicOpen, setResumeBasicOpen] = React.useState(false);
  const [educationOpen, setEducationOpen] = React.useState(false);

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const container = windowProps !== undefined ? () => windowProps().document.body : undefined;

  useDebounce(
    () => {
      const reorderFunc = async () => {
        const { error } = await apiPut<any, any>({
          url: `/api/v1/resumes/${query.slug}`,
          data: {
            moduleOrder: reordered,
          },
        });

        if (error) {
          toast.error(error.message);
          return;
        }
      };

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

  const handleEditClick = (item: ModuleMapKeys) => {
    if (item === 'resumeBasic') {
      setResumeBasicOpen(true);
      return;
    }

    if (item === 'education') {
      setEducationOpen(true);
      return;
    }
  };

  // #region 提交简历个人信息
  const handleResumeBasicSubmit = async (values: any) => {
    const { data, error } = await apiPut<any, any>({
      url: `/api/v1/resumes/${query.slug}/update-resume-basic`,
      data: values,
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    return true;
  };
  // #endregion

  // #region 提交简历模块
  const handleEducationOpenSubmit = async (values: any) => {
    const { data, error } = await apiPut<any, any>({
      url: `/api/v1/resumes/${query.slug}/update-education`,
      data: values,
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    return true;
  }
  // #endregion

  const drawer = (
    <Box sx={styles.modulesBox}>
      <Reorder.Group axis="y" onReorder={handleReorder} values={reordered.split(',')}>
        {_.map(reordered.split(','), (item: ModuleMapKeys) => (
          <ModuleItemCard onEditClick={handleEditClick} key={item} item={item} />
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

      <ResumeBasicModalForm
        ignoreTrigger
        initData={data.resumeBasic || {}}
        open={resumeBasicOpen}
        onChange={setResumeBasicOpen}
        onSubmit={handleResumeBasicSubmit}
      />

      <EducationModalForm
        ignoreTrigger
        initData={data.education || {}}
        open={educationOpen}
        onChange={setEducationOpen}
        onSubmit={handleEducationOpenSubmit}
      />
    </Box>
  );
};

export default RightSideBar;
