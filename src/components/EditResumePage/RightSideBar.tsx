import React from 'react';
import { toast } from 'react-toastify';
import { apiPut } from '@/api';
import _ from 'lodash';

// Components
import { Reorder } from 'framer-motion';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

// Project Components
import ModuleItemCard from './ModuleItemCard';
import EducationModalForm from './EducationModalForm';
import ResumeBasicModalForm from './ResumeBasicModalForm';
import WorkExperienceModalForm from './WorkExperienceModalForm';
import ProjectModalForm from './ProjectModalForm';

// Hooks
import { useSWRConfig } from 'swr';
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
  const { mutate } = useSWRConfig();

  const theme = useTheme();
  const router = useRouter();
  const { query } = router;
  const [reordered, setReordered] = React.useState(modules);
  const [debouncedReordered, setDebouncedReordered] = React.useState('');

  // Modal 框相关 State
  const [resumeBasicOpen, setResumeBasicOpen] = React.useState(false);
  const [educationOpen, setEducationOpen] = React.useState(false);
  const [workExperienceOpen, setWorkExperienceOpen] = React.useState(false);
  const [projectOpen, setProjectOpen] = React.useState(false);

  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const container = windowProps !== undefined ? () => windowProps().document.body : undefined;

  useDebounce(
    () => {
      if (debouncedReordered) {
        mutate(`/api/v1/resumes/${query.slug}`, async (mutateData: any) => {
          const { data, error } = await apiPut<any, any>({
            url: `/api/v1/resumes/${query.slug}`,
            data: {
              moduleOrder: reordered,
            },
          });

          if (error) {
            toast.error(error.message);
            return mutateData;
          }

          return {
            ...mutateData,
            data,
          }
        }, {
          // API 已经给我们提供了更新的信息，
          // 所以我们不需要在这里重新请求。
          revalidate: false
        })
      }

      setDebouncedReordered(reordered);
    },
    1000,
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

    if (item === 'workExperience') {
      setWorkExperienceOpen(true);
      return;
    }

    if (item === 'project') {
      setProjectOpen(true);
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

    mutate(`/api/v1/resumes/${query.slug}`);
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

    mutate(`/api/v1/resumes/${query.slug}`);
    return true;
  };
  // #endregion

  // #region 提交工作经历
  const handleWorkExperienceOpenSubmit = async (values: any) => {
    const { error } = await apiPut<any, any>({
      url: `/api/v1/resumes/${query.slug}/update-work-experience`,
      data: values,
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    mutate(`/api/v1/resumes/${query.slug}`);
    return true;
  };

  // #region 提交项目经历
  const handleProjectOpenSubmit = async (values: any) => {
    const { error } = await apiPut<any, any>({
      url: `/api/v1/resumes/${query.slug}/update-project`,
      data: values,
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    mutate(`/api/v1/resumes/${query.slug}`);
    return true;
  };
  // #endregion


  const drawer = (
    <Box sx={styles.modulesBox}>
      <Box sx={{ mb: 1.5 }}>
        <ModuleItemCard disableReorder onEditClick={handleEditClick} item="resumeBasic" />
      </Box>
      <Reorder.Group axis="y" onReorder={handleReorder} values={reordered.split(',')}>
        {_.map(
          reordered.split(',').filter((i) => i !== 'resumeBasic'),
          (item: ModuleMapKeys) => (
            <ModuleItemCard onEditClick={handleEditClick} key={item} item={item} />
          ),
        )}
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

      <WorkExperienceModalForm
        ignoreTrigger
        initData={data.workExperience || {}}
        open={workExperienceOpen}
        onChange={setWorkExperienceOpen}
        onSubmit={handleWorkExperienceOpenSubmit}
      />

      <ProjectModalForm
        ignoreTrigger
        initData={data.project || {}}
        open={projectOpen}
        onChange={setProjectOpen}
        onSubmit={handleProjectOpenSubmit}
      />
    </Box>
  );
};

export default RightSideBar;
