import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { AppBar, Box, Button, Paper, Toolbar, useTheme, useMediaQuery } from '@mui/material';

import _ from 'lodash';
import templateMap from '@/components/Resume/templateMap';
import styles from './styles';

// Hooks
import { useRouter } from 'next/router';
import useApi from '@/hooks/useApi';

// Project Components
import FullPageLoading from '@/components/FullPageLoading';
import LeftSideBar from '@/components/EditResumePage/LeftSideBar';
import RightSideBar from '@/components/EditResumePage/RightSideBar';
import Header from '@/components/EditResumePage/Header';

export interface DashboardLayoutProps {
  noPadding?: boolean;
  children?: ReactElement;
  window?: () => Window;
}

const EditResumePage = (props: DashboardLayoutProps) => {
  // 获取主题
  const theme = useTheme();
  // 监听窗口宽度是否大于 900 px
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  // 控制左侧菜单显示隐藏
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(false);
  // 控制有侧菜单显示隐藏
  const [rightDrawerOpened, setRightDrawerOpened] = useState(false);

  // 当窗口匹配发生变化时
  useEffect(() => {
    setRightDrawerOpened(matchUpMd);
    setLeftDrawerOpened(matchUpMd);
  }, [matchUpMd]);

  const router = useRouter();
  const { query } = router;
  const { data = {}, loading } = useApi(query.slug ? `/api/v1/resumes/${query.slug}` : null);
  // const [data, setData] = useState(fakeData);

  // 已经添加的模块(排序后)
  // const addedModules = data.moduleOrder ? data.moduleOrder.split(',') : [];

  // console.log('请求来的', data);

  if (loading) {
    return <FullPageLoading loading={loading} />;
  }

  // @ts-ignore
  const ResumeComponent = templateMap[data.layoutType].component || null;

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened);
  };

  const handleRightDrawerToggle = () => {
    setRightDrawerOpened(!rightDrawerOpened);
  };

  return (
    <Box sx={styles.layoutSX}>
      <Header
        leftDrawerOpened={leftDrawerOpened}
        rightDrawerOpened={rightDrawerOpened}
        onLeftDrawerToggle={handleLeftDrawerToggle}
        onRightDrawerToggle={handleRightDrawerToggle}
      />

      <LeftSideBar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <RightSideBar
        data={data}
        drawerOpen={rightDrawerOpened}
        drawerToggle={handleRightDrawerToggle}
        modules={data.moduleOrder}
      />

      <TransformWrapper
        centerOnInit
        minScale={0.25}
        initialScale={0.75}
        limitToBounds={false}
        centerZoomedOut={false}
        pinch={{ step: 1 }}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
          <Box
            sx={{
              transition:
                'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, margin-right 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                background: '#f5f5f7',
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  margin: '0 auto',
                  width: '210mm',
                  minHeight: '297mm',
                  position: 'relative',
                  zIndex: '50',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <ResumeComponent data={data} />
              </Paper>
            </Box>
          </Box>
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

export default EditResumePage;
