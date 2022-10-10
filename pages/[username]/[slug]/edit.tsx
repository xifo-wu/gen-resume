import React, { useState } from 'react';
import type { ReactElement } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { AppBar, Box, Button, Paper, Toolbar, useTheme } from '@mui/material';

import _ from 'lodash';
import templateMap from '@/components/Resume/templateMap';
import styles from './styles';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router';

// project imports
import FullPageLoading from '@/components/FullPageLoading';
import LeftSideBar from '@/components/EditResumePage/LeftSideBar';
import RightSideBar from '@/components/EditResumePage/RightSideBar';
import Header from '@/components/EditResumePage/Header';

export interface DashboardLayoutProps {
  noPadding?: boolean;
  children?: ReactElement;
  window?: () => Window;
}

const fakeData = {
  name: '我的第一份简历',
  slug: 'xiforesume',
  layoutType: 'style1',
  config: {
    // 主题色
    themeColor: 'rgb(75,85,105)', // '#2065d1',
    // 以背景色为底的字体颜色
    themeBgTextColor: '#fff',
  },
  basics: {
    name: {
      label: '姓名',
      isShowLabel: true,
      value: '吴嘻嘻',
      visible: true,
    },
    avatar: {
      label: '头像',
      isShowLabel: false,
      value:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      visible: true,
    },
    birthday: {
      label: '生日',
      isShowLabel: true,
      value: '1998-06-07',
      visible: true,
    },
    age: {
      label: '年龄',
      isShowLabel: true,
      value: '24',
      visible: false,
    },
    job: {
      label: '求职目标',
      isShowLabel: true,
      value: '前端工程师',
      visible: true,
    },
    mobile: {
      label: '联系电话',
      isShowLabel: true,
      value: '13333333333',
      visible: true,
    },
    website: {
      label: '网站',
      isShowLabel: true,
      value: 'https://mirai.xifo.in',
      visible: true,
    },
    email: {
      label: '邮箱',
      isShowLabel: true,
      value: 'xifo.wu@gmail.com',
      visible: true,
    },
    educationalQualifications: {
      label: '文凭',
      isShowLabel: true,
      value: '大专',
      visible: false,
    },
    desc: {
      label: '描述',
      isShowLabel: true,
      value: '一个没有必要的描述字段，支持 markdown 格式',
      visible: false,
    },
  },
  workExperience: {
    sortIndex: 0,
    label: '工作经历',
    moduleType: 'style_1', // 标题模块的标识
    contentType: 'style_2', // 内容展示的标识
    visible: true,
    config: {
      color: '#333',
      fontSize: 16,
    }, // 里面就放一些 css 样式。后端可以直接存字符串
    items: [
      {
        companyName: '一个鲨币公司',
        visible: true, // 选择展示还是不展示。
        startOn: '2019-02',
        endOn: '', // 可以为空，代表至今
        job: '前端工程师',
        desc: '岗位职责, 支持 markdown',
      },
    ],
  },
  education: {
    visible: false,
  },
};

const EditResumePage = (props: DashboardLayoutProps) => {
  // 获取主题
  const theme = useTheme();
  // 控制左侧菜单显示隐藏
  const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);

  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { data = {}, loading } = useApi(query.slug ? `/api/v1/resumes/${query.slug}` : null);
  // const [data, setData] = useState(fakeData);

  // 已经添加的模块(排序后)
  const addedModules = data.moduleOrder ? data.moduleOrder.split(',') : [];

  console.log('请求来的', data);

  console.log('已经添加的模块', addedModules);

  if (loading) {
    return <FullPageLoading loading={loading} />;
  }

  // @ts-ignore
  const ResumeComponent = templateMap[data.layoutType].component || null;

  const handleSelectedTemplate = (id: string) => {
    const nextData = _.cloneDeep(fakeData);
    nextData.layoutType = id;
    console.log(id);
    // setData(nextData);
  };

  const handleAddModule = (id: string) => {
    const nextData = _.cloneDeep(fakeData);
    // @ts-ignore
    nextData[id] = {
      sortIndex: 1,
      label: '教育经历',
      moduleType: 'style_1', // 标题模块的标识
      contentType: 'style_2', // 内容展示的标识
      visible: true,
      config: {
        color: '#333',
        fontSize: 16,
      }, // 里面就放一些 css 样式。后端可以直接存字符串
    };
    // console.log(id);
    // setData(nextData);
  };

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpened(!leftDrawerOpened);
  };

  return (
    <Box sx={styles.layoutSX}>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
        }}
      >
        <Toolbar>
          <Header leftDrawerOpened={leftDrawerOpened} onLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <LeftSideBar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <RightSideBar modules={addedModules} />
      {/* <SideBar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSelectedTemplate={handleSelectedTemplate}
        onAddModule={handleAddModule}
      />
      <RightSideBar
        data={data}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSelectedTemplate={handleSelectedTemplate}
        onAddModule={handleAddModule}
      /> */}
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
