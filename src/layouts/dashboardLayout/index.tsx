import { useState } from 'react';
import type { ReactElement } from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/Inbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import styles from './styles';

export interface DashboardLayoutProps {
  noPadding?: boolean;
  children?: ReactElement;
  window?: () => Window;
}

const drawerWidth = 250;

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { noPadding, window, children } = props;
  const container = window !== undefined ? () => window().document.body : undefined;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
            textAlign: 'center',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            textDecoration: 'none',
            flexGrow: 1,
            color: '#333',
          }}
        >
          Gen-Resume
        </Typography>
      </Toolbar>
      <Divider
        sx={{
          my: '0.5rem',
          height: '0.0625rem',
          opacity: 0.25,
          border: 0,
          backgroundImage:
            'linear-gradient(to right, transparent, rgba(52, 71, 103, 0.5), transparent)',
        }}
      />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              mx: 2,
              padding: '0.675rem 0.8rem 0.675rem 1rem',
            }}
          >
            <ListItemIcon sx={{ minWidth: 'unset' }}>
              <DashboardIcon
                sx={(theme) => ({
                  color: '#fff',
                  p: 1,
                  flexShrink: '0',
                  background: theme.palette.primary.main,
                  // background: rgb(233, 236, 239);
                  minWidth: '2rem',
                  minHeight: '2rem',
                  borderRadius: '0.5rem',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow:
                    'rgba(20, 20, 20, 0.12) 0rem 0.25rem 0.375rem -0.0625rem, rgba(20, 20, 20, 0.07) 0rem 0.125rem 0.25rem -0.0625rem',
                  transition: 'margin 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                })}
              />
            </ListItemIcon>
            <ListItemText
              primary="控制台"
              sx={{
                ml: 1,
                '& .MuiListItemText-primary': {
                  fontWeight: 500,
                  letterSpacing: 1.25
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={styles.layoutSX}>
      {/* <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          // display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer> */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          display: { xs: 'none', lg: 'flex' },
          '& .MuiDrawer-paper': {
            borderRadius: 2,
            position: 'fixed',
            top: 0,
            flex: '1 0 auto',
            boxSizing: 'border-box',
            width: drawerWidth,
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
      <Box
        sx={{
          marginLeft: { xs: 0, lg: `${drawerWidth + 32}px` },
          transition:
            'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, margin-right 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          p: noPadding ? 0 : 3,
          position: 'relative',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
