import { Theme } from "@mui/material";

export default {
  pageContainer: {
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  // 仿 MAC App 容器样式
  imitateMacAppContainer: (theme: Theme) => ({
    height: '100%',
    background: 'rgba(16, 18, 27, 0.78)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    // backdropFilter: 'saturate(200%) blur(30px)',
    px: 0,
    [theme.breakpoints.up('sm')]: {
      px: 0,
    }
  }),
  imitateMacAppHeader: {
    display: 'flex',
    alignItems: 'center',
    px: 4,
    height: 56,
    width: '100%',
    borderBottom: '1px solid rgba(255, 255, 255, 0.25)',
    flexShrink: '0',
    whiteSpace: 'nowrap',
  },
  menuCircle: {
    display: 'flex',
    gap: 1.5,
    '& .action': {
      width: 16,
      height: 15,
      borderRadius: '50%',
      flexShrink: 0,
    },
    '& .close': {
      backgroundColor: '#f96057',
    },
    '& .yellow': {
      backgroundColor: '#FEBC2E',
    },
    '& .full': {
      backgroundColor: '#5fcf65',
    }
  },
  imitateMacAppBody: {
    overflow: 'auto',
  }
};
