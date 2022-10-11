import type { Theme } from '@mui/material';

export default {
  modulesBox: {
    p: 1,
    '& ul, & li': {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      fontSize: 24,
    },
    '& li': {
      borderRadius: '1rem',
      mb: 1.5,
    }
  },
  drawerContainer: (theme: Theme, drawerWidth: number) => ({
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderLeft: 'none',
      [theme.breakpoints.up('md')]: {
        height: 'calc(100vh - 64px)',
        overflow: 'hidden',
        top: 64,
      },
    },
  }),
};
