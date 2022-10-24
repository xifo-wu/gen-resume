import { Theme } from '@mui/material';

export default {
  container: {
    minHeight: '75vh',
    width: '100%',
    opacity: '1',
    background:
      'url("https://images.unsplash.com/photo-1648315156503-5335899e3470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80") center top / cover transparent',
    color: 'rgb(52, 71, 103)',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'inline-block',
      background: 'rgba(0, 0, 0, 0.7)',
    },
    '& .content-box': {
      zIndex: 9,
      textAlign: 'center',
    },
  },
  title: (theme: Theme) => ({
    display: {
      md: 'inline',
      sm: 'block',
    },
    fontFamily: 'monospace',
  }),
  desc: {
    textAlign: 'center',
    my: 4,
    color: '#fff',
  },
};
