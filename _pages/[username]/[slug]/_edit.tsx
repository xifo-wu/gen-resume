import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import {
  Button,
  Box,
  Paper,
  Toolbar,
  useTheme,
  useMediaQuery,
  Grid,
  Container,
  Card,
  CardActionArea,
  CardMedia,
} from '@mui/material';

import _ from 'lodash';
import templateMap from '@/components/Resume/templateMap';
import PrintIcon from '@mui/icons-material/Print';

// Hooks
import { useDebounce } from 'react-use';
import { useRouter } from 'next/router';
import useApi from '@/hooks/useApi';

// Project Components
import FullPageLoading from '@/components/FullPageLoading';
import LeftSideBar from '@/components/EditResumePage/LeftSideBar';
import RightSideBar from '@/components/EditResumePage/RightSideBar';
import Image from 'next/image';
import Header from '@/src/components/EditResumePage/Header';

import { Theme } from '@mui/material';
import NavBar from '@/components/NavBar';
import ChooseResumeTemplate from '@/components/ChooseResumeTemplate';
import api, { apiPut } from '@/api';
import { toast } from 'react-toastify';
import ToolsBar from '@/components/EditResumePage/ToolsBar';
import ResumeSetting from '@/components/ResumeSetting';

const layoutSX = (theme: Theme) => ({
  height: '100vh',
  width: '100vw',
  background: theme.palette.mode === 'dark' ? '#161c24' : '#f5f5f7',
  display: 'flex',
});

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
  // 监听窗口大小是否大于 1200 px
  const matchUpLg = useMediaQuery(theme.breakpoints.up('lg'));
  // 当前的工具 Tab
  const [currentTab, setCurrentTab] = useState('chooseResumeTemplate');
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
  const {
    data = {},
    loading,
    mutate,
  } = useApi(query.slug ? `/api/v1/resumes/${query.slug}` : null);

  if (loading) {
    return <FullPageLoading loading={loading} />;
  }

  async function handleLayoutTypeChange(layoutType: string) {
    // TODO Fix any
    mutate(
      async (originData: any) => {
        const response = await apiPut({
          url: `/api/v1/resumes/${query.slug}/resume-layout-type`,
          data: {
            layoutType,
          },
        });
        const { error } = response;
        if (error) {
          toast.error(error.message);
          return originData;
        }

        console.log(response, 'response');

        return response;
      },
      { revalidate: false },
    );
  }

  const ResumeComponent = templateMap[data.layoutType].component || null;

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened);
  };

  const handleRightDrawerToggle = () => {
    setRightDrawerOpened(!rightDrawerOpened);
  };

  const handleActionClick = (id: number, actionName: string) => {
    console.log(id, actionName, "id, actionName")
  }

  if (matchUpLg) {
    return (
      <Box sx={{ background: '#f5f5f7', minHeight: '100vh', height: '100%' }}>
        <NavBar />
        <Container maxWidth="xl" sx={{ pt: 12, pb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs="auto">
              <Box
                sx={{
                  width: `calc(${210 * 0.7}mm)`,
                  height: `calc(${297 * 0.7}mm)`,
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    transform: 'scale(0.7)',
                    width: '210mm',
                    height: '297mm',
                    transformOrigin: 'top left',
                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  <ResumeComponent data={data} onActionClick={handleActionClick} />
                </Paper>
              </Box>
            </Grid>
            <Grid item xs>
              <ToolsBar value={currentTab} onChange={setCurrentTab} />
              <Box
                sx={{
                  p: 1,
                  mt: 2,
                  background: '#fff',
                  height: `calc(${297 * 0.7}mm - 72px)`,
                  overflowY: 'auto',
                }}
              >
                {currentTab === 'chooseResumeTemplate' && (
                  <ChooseResumeTemplate value={data.layoutType} onChange={handleLayoutTypeChange} />
                )}

                {currentTab === 'resumeSetting' && <ResumeSetting layoutType={data.layoutType} themeColor={data.themeColor} mutate={mutate} />}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ background: '#f5f5f7' }}>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 12, pb: 4, height: '100vh', width: '100vw' }}>
        <TransformWrapper
          centerOnInit
          minScale={0.25}
          initialScale={0.75}
          limitToBounds
          centerZoomedOut
          pinch={{ step: 1 }}
          wheel={{ step: 0.1 }}
          doubleClick={{
            disabled: true,
          }}
        >
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <Paper
              elevation={1}
              sx={{
                position: 'relative',
                top: 0,
                left: 0,
                margin: '0 auto',
                width: '210mm',
                minHeight: '297mm',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <ResumeComponent data={data} />
            </Paper>
          </TransformComponent>
        </TransformWrapper>

        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            width: 'calc(100% - 128px)',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Box
            sx={{
              maxWidth: 1536,
              margin: 'auto',
              background: 'rgba(255, 255, 255, 0.8)',
              color: 'rgb(52, 71, 103)',
              borderRadius: '0.75rem',
              boxShadow:
                'rgba(0, 0, 0, 0.1) 0rem 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.06) 0rem 0.125rem 0.25rem -0.0625rem',
              backdropFilter: 'saturate(200%) blur(30px)',
              py: 1,
              px: {
                xs: 3,
                sm: 3,
                md: 2,
              },
            }}
          >
            <Button variant="outlined" sx={{ mr: 1 }}>
              选择模块
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              模版样式
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              添加模块
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              模块排序
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
    // <Box sx={layoutSX}>
    //   <Header
    //     leftDrawerOpened={leftDrawerOpened}
    //     rightDrawerOpened={rightDrawerOpened}
    //     onLeftDrawerToggle={handleLeftDrawerToggle}
    //     onRightDrawerToggle={handleRightDrawerToggle}
    //   />

    //   <LeftSideBar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
    //   <RightSideBar
    //     data={data}
    //     drawerOpen={rightDrawerOpened}
    //     drawerToggle={handleRightDrawerToggle}
    //   />

    //   <TransformWrapper
    //     centerOnInit
    //     minScale={0.25}
    //     initialScale={0.75}
    //     limitToBounds={false}
    //     centerZoomedOut={false}
    //     pinch={{ step: 1 }}
    //     wheel={{ step: 0.1 }}
    //     doubleClick={{
    //       disabled: true
    //     }}
    //   >
    //     <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
    //       <Box
    //         sx={{
    //           transition:
    //             'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, margin-right 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    //           position: 'relative',
    //         }}
    //       >
    //         <Box
    //           sx={{
    //             display: 'flex',
    //             background: '#f5f5f7',
    //           }}
    //         >
    //           <Paper
    //             elevation={0}
    //             sx={{
    //               margin: '0 auto',
    //               width: '210mm',
    //               minHeight: '297mm',
    //               position: 'relative',
    //               zIndex: '50',
    //               display: 'flex',
    //               flexDirection: 'column',
    //             }}
    //           >
    //             <ResumeComponent data={data} />
    //           </Paper>
    //         </Box>
    //       </Box>
    //     </TransformComponent>
    //   </TransformWrapper>
    // </Box>
  );
};

export default EditResumePage;
