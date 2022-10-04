import React from 'react';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material';

interface TitleProps {
  children: React.ReactNode;
}

const titleSx = (theme: Theme) => ({
  color: theme.palette.mode === 'dark' ? '#fff' : '#121212',
  fontSize: 28,
  fontWeight: 600,
  m: 0,
  mb: '0.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: 20,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 24,
  }
})

const flagSx = (theme: Theme) => ({
  color: theme.palette.primary.main,
})

const Title = (props: TitleProps) => {
  const { children } = props;

  return <Box component="h1" sx={titleSx}>{children}
    <Box component="span" sx={flagSx}>。</Box>
  </Box>;
};

export default Title;
