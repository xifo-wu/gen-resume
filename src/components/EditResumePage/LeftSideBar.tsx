import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useTheme, useMediaQuery } from '@mui/material';

// components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// Project Components
import MenuList from '../MenuList';
import LogoSection from '../LogoSection';
import ChooseResumeModuleModal from './ChooseResumeModuleModal';
import ChooseResumeTemplatesModal from './ChooseResumeTemplatesModal';

// Hooks
import { useSWRConfig } from 'swr';

// types
import type { DrawerProps } from '@mui/material';
import type { MenuItem } from '../MenuList';

// styles
import styles from './LeftSideBarStyles';
import { apiPut } from '@/api';

// constant
const drawerWidth = 240;

interface Props {
  drawerOpen?: boolean;
  window?: () => Window;
  drawerToggle?: DrawerProps['onClose'];
}

// 左侧菜单
// 用于选择模版、添加模块等
const LeftSideBar = (props: Props) => {
  const { window, drawerOpen, drawerToggle } = props;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { query } = router;
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [resumeModuleOpen, setResumeModuleOpen] = useState(false);
  const [resumeTemplatesOpen, setResumeTemplatesOpen] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleMenuClick = (key: string, item: MenuItem) => {
    if (key === 'resumeModules') {
      setResumeModuleOpen(true);
      return;
    }

    if (key === 'resumeTemplates') {
      setResumeTemplatesOpen(true);
      return;
    }
  };

  // #region 确认选择添加模块
  const handleChooseResumeModule = async (value: string) => {
    let url = '';
    if (value === 'education') {
      url = `/api/v1/resumes/${query.slug}/add-education`;
    }

    if (value === 'workExperience') {
      url = `/api/v1/resumes/${query.slug}/add-work-experience`;
    }

    if (value === 'project') {
      url = `/api/v1/resumes/${query.slug}/add-project`;
    }

    if (value === 'others') {
      url = `/api/v1/resumes/${query.slug}/add-other`;
    }

    if (!url) return false;

    const { error } = await apiPut<any, any>({
      url,
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    mutate(`/api/v1/resumes/${query.slug}`);
    return true;
  };
  // #endregion

  // 选择模版
  const handleChooseResumeTemplates = async (value: string) => {
    const { error } = await apiPut<any, any>({
      url: `/api/v1/resumes/${query.slug}/update-resume-layout-type`,
      data: {
        layoutType: value,
      },
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    mutate(`/api/v1/resumes/${query.slug}`)
    return true;
  };

  const drawer = (
    <>
      <Box sx={styles.logoContainer}>
        <Box sx={styles.logoContent}>
          <LogoSection />
        </Box>
      </Box>
      <Box sx={styles.menuContainer}>
        <MenuList onMenuClick={handleMenuClick} />
      </Box>
      {process.env.NEXT_PUBLIC_VERSION && (
          <Box sx={styles.version}>
            <Box sx={styles.versionLabel}>version</Box>
            {process.env.NEXT_PUBLIC_VERSION}
          </Box>
        )}
    </>
  );

  return (
    <Box component="nav" sx={{ flexShrink: { md: 0 } }}>
      <Drawer
        anchor="left"
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

      <ChooseResumeModuleModal
        ignoreTrigger
        onSubmit={handleChooseResumeModule}
        open={resumeModuleOpen}
        onChange={setResumeModuleOpen}
      />

      <ChooseResumeTemplatesModal
        ignoreTrigger
        onSubmit={handleChooseResumeTemplates}
        open={resumeTemplatesOpen}
        onChange={setResumeTemplatesOpen}
      />

    </Box>
  );
};

export default LeftSideBar;
