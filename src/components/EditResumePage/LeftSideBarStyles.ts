import { grey } from '@mui/material/colors';

// Types
import type { Theme } from '@mui/material';

export default {
  drawerContainer: (theme: Theme, drawerWidth: number) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderRight: 'none',
      [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 64px)',
        top: 64,
      },
    },
  }),
  logoContainer: {
    width: '100%',
    display: { xs: 'block', md: 'none' },
  },
  logoContent: {
    display: 'flex',
    p: {
      xs: 3,
      md: 2,
    },
    mx: 'auto',
  },
  menuContainer: {
    flex: 1,
    px: 2,
  },
  // 版本样式
  version: {
    textAlign: 'center',
    m: 2,
    fontWeight: 600,
    fontSize: '1.125rem',
  },
  versionLabel: {
    color: grey[500],
    fontSize: '0.875rem',
  },
};
