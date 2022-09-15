import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  List,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import LayoutDrawContent from './LayoutDrawContent';
import ThemeDrawContent from './ThemeDrawContent';
import ModuleDrawContent from './ModuleDrawContent';
import { EditOutlined } from '@mui/icons-material';
import _ from 'lodash';
import type { ResumeType } from '@/components/Resume/types';

export interface SideBarProps {
  // 移动端显示隐藏
  mobileOpen?: boolean;
  // 抽屉宽度
  drawerWidth?: number;
  onClose?: () => void;
  onSelectedTemplate: (id: string) => void;
  onAddModule: (id: string) => void;
  window?: () => Window;
  data: ResumeType;
}

type MenuItemKeys = 'layout' | 'theme' | 'module';
const SideBar = (props: SideBarProps) => {
  const {
    data,
    window,
    mobileOpen,
    onAddModule,
    onSelectedTemplate,
    onClose,
    drawerWidth = 250,
  } = props;
  const container = window !== undefined ? () => window().document.body : undefined;
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [configOpen, setConfigOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItemKeys>('layout');

  const handleSelectedTemplate = (id: string) => {
    onSelectedTemplate(id);
    setConfigOpen(false);
  };

  const handleAddModule = (id: string) => {
    onAddModule(id);
    setConfigOpen(false);
  };

  const menuItem = useMemo(
    () => ({
      layout: {
        title: '选择模版',
        draw: <LayoutDrawContent onSelect={handleSelectedTemplate} />,
      },
      theme: {
        title: '选择主题',
        draw: <ThemeDrawContent />,
      },
      module: {
        title: '添加模块',
        draw: <ModuleDrawContent onAddModule={handleAddModule} />,
      },
    }),
    [],
  );

  const handleMenuClick = (key: MenuItemKeys) => {
    setConfigOpen(true);
    setSelectedMenu(key);
  };

  const modules = [
    {
      id: 'workExperience',
      name: '工作经历',
      en: 'Work Experience',
    },
    {
      id: 'education',
      name: '教育经历',
      en: 'Education',
    },
    {
      id: 'projects',
      name: '项目经历',
      en: 'Projects',
    },
  ];

  const modulesItems = _.chain(modules)
    .filter((i) => {
      // @ts-ignore
      return data[i.id];
    })
    .map((i) => ({
      // @ts-ignore
      sortIndex: data[i.id].sortIndex,
      ...i,
    }))
    .value();

  // // label
  console.log(modulesItems, 'modulesItems');

  const drawer = (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        {modulesItems.map((item) => (
          <Grid key={item.id} xs={12} item>
            <Box
              sx={{
                p: 2,
                color: 'rgba(0, 0, 0, 0.87)',
                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minWidth: '0px',
                overflowWrap: 'break-word',
                backgroundColor: 'rgb(255, 255, 255)',
                backgroundClip: 'border-box',
                border: '0px solid rgba(0, 0, 0, 0.125)',
                borderRadius: '1rem',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
              }}
            >
              <Grid container spacing={1} alignItems="center">
                <Grid item xs="auto">
                  <Box
                    onClick={() => handleAddModule(item.id)}
                    sx={{
                      // mr: 1,
                      cursor: 'pointer',
                      width: '2rem',
                      height: '2rem',
                      marginLeft: 'auto',
                      display: 'flex',
                      WebkitBoxPack: 'center',
                      justifyContent: 'center',
                      WebkitBoxAlign: 'center',
                      alignItems: 'center',
                      opacity: '1',
                      background:
                        'linear-gradient(310deg, rgba(0, 0, 0, 0.125), rgba(0, 0, 0, 0.05))',
                      color: '#333',
                      borderRadius: '0.5rem',
                      boxShadow:
                        'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
                    }}
                  >
                    <OpenWithIcon
                      sx={{
                        userSelect: 'none',
                        width: '1em',
                        height: '1em',
                        overflow: 'hidden',
                        display: 'inline-block',
                        textAlign: 'center',
                        flexShrink: '0',
                        fontSize: '1rem !important',
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={7}>
                  <Box>
                    <Typography
                      sx={{
                        margin: '0px',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        fontSize: '0.375rem',
                        lineHeight: '1.5',
                        letterSpacing: '0.02857em',
                        opacity: '1',
                        textTransform: 'capitalize',
                        verticalAlign: 'unset',
                        textDecoration: 'none',
                        color: 'rgb(103, 116, 142)',
                        fontWeight: '700',
                      }}
                    >
                      {item.en}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        margin: '0px',
                        fontSize: '0.875rem',
                        lineHeight: 1.375,
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                        letterSpacing: '0em',
                        opacity: '1',
                        textTransform: 'none',
                        verticalAlign: 'unset',
                        textDecoration: 'none',
                        color: 'rgb(52, 71, 103)',
                        fontWeight: '700',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs>
                  <Box
                    onClick={() => handleAddModule(item.id)}
                    sx={{
                      cursor: 'pointer',
                      width: '2rem',
                      height: '2rem',
                      marginLeft: 'auto',
                      display: 'flex',
                      WebkitBoxPack: 'center',
                      justifyContent: 'center',
                      WebkitBoxAlign: 'center',
                      alignItems: 'center',
                      opacity: '1',
                      background: 'linear-gradient(310deg, rgb(33, 82, 255), rgb(33, 212, 253))',
                      color: 'rgb(255, 255, 255)',
                      borderRadius: '0.5rem',
                      boxShadow:
                        'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
                    }}
                  >
                    <EditOutlined
                      sx={{
                        userSelect: 'none',
                        width: '1em',
                        height: '1em',
                        overflow: 'hidden',
                        display: 'inline-block',
                        textAlign: 'center',
                        flexShrink: '0',
                        fontSize: '1rem !important',
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        anchor="right"
        sx={{
          display: { xs: 'none', lg: 'fixed' },
          '& .MuiDrawer-paper': {
            borderRadius: 2,
            flex: '1 0 auto',
            boxSizing: 'border-box',
            width: 250,
            color: 'rgba(0, 0, 0, 0.87)',
            overflowY: 'auto',
            m: '1rem',
            outline: 0,
            height: 'calc(100vh - 2rem)',
            backdropFilter: 'saturate(200%) blur(1.875rem)',
            border: 'none',
            boxShadow: 'rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
            marginBottom: 'inherit',
            transition:
              'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, background-color 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100vw', sm: '1vw', md: '25vw', lg: '35vw' },
            borderRight: 0,
            boxShadow: 'rgba(0, 0, 0, 0.07) 0rem 1.25rem 1.6875rem 0rem',
          },
        }}
        variant={matches ? 'persistent' : 'temporary'}
        open={configOpen}
        onClose={() => setConfigOpen(false)}
      >
        <Button
          onClick={() => {
            setConfigOpen(false);
          }}
        >
          xxx
        </Button>
        {menuItem[selectedMenu].draw}
      </Drawer>
    </>
  );
};

export default SideBar;
