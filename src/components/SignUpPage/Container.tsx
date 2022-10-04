import React from 'react';
import Box from '@mui/material/Box';
import { darken } from '@mui/material';
import type { Theme } from '@mui/material';

interface ContainerProps {
  children: React.ReactNode;
}

const containerSx = (theme: Theme) => ({
  position: 'relative',
  minHeight: '100vh',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItem: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: -1,
    backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.96) 90%), url("https://images.unsplash.com/photo-1648315156503-5335899e3470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',

    [theme.breakpoints.up('xl')]: {
      width: '50%',
      height: '100%',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%)',
    },
    [theme.breakpoints.down('xl')]: {
      width: '50%',
      height: '100%',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%)',
    },
    [theme.breakpoints.down('lg')]: {
      width: '45%',
      height: '100%',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 30% 100%)',
    },
    [theme.breakpoints.down('sm')]: {
      clipPath: 'circle(91.3% at 25% 0)',
      width: '100%',
      height: '45%',
    },
  },
});

const contentSx = (theme: Theme) => ({
  margin: 'auto',
  width: '100%',
  height: '100%',
  px: 2,
  // 超过 xl（1536px） 时限制最大宽度
  [theme.breakpoints.up('xl')]: {
    maxWidth: 1200,
  },
  [theme.breakpoints.down('md')]: {
    px: 2,
  },
});

const Container = ({ children }: ContainerProps) => {
  return (
    <Box sx={containerSx}>
      <Box sx={contentSx}>{children}</Box>
    </Box>
  );
};

export default Container;
