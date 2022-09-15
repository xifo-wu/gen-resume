import { useState, useMemo } from 'react';
import {
  Button,
  Divider,
  Drawer,
  List,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuItem from './MenuItem';
import LayoutDrawContent from './LayoutDrawContent';
import ThemeDrawContent from './ThemeDrawContent';
import ModuleDrawContent from './ModuleDrawContent';

export interface SideBarProps {
  // 移动端显示隐藏
  mobileOpen?: boolean;
  // 抽屉宽度
  drawerWidth?: number;
  onClose?: () => void;
  onSelectedTemplate: (id: string) => void;
  onAddModule: (id: string) => void;
  window?: () => Window;
}

type MenuItemKeys = 'layout' | 'theme' | 'module';
const SideBar = (props: SideBarProps) => {
  const { window, mobileOpen, onAddModule, onSelectedTemplate, onClose, drawerWidth = 250 } = props;
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

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          className="title"
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
            color: '#333',
          }}
        >
          Gen-Resume
        </Typography>
      </Toolbar>
      <List>
        <MenuItem
          keyName="layout"
          onClick={() => handleMenuClick('layout')}
          title="选择模版"
          icon={DashboardIcon}
        />
        <MenuItem
          keyName="theme"
          onClick={() => handleMenuClick('theme')}
          title="选择主题"
          icon={PaletteIcon}
        />
        <MenuItem
          keyName="module"
          onClick={() => handleMenuClick('module')}
          title="添加模块"
          icon={SubtitlesIcon}
        />
      </List>
    </div>
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
        sx={{
          display: { xs: 'none', lg: 'flex' },
          '& .MuiDrawer-paper': {
            borderRadius: 2,
            position: 'fixed',
            top: 0,
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
            left: 0,
            transform: 'translateX(0px)',
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
