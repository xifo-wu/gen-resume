import React from 'react';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material';

interface SubTitleProps {
  children: React.ReactNode;
}

const titleSx = (theme: Theme) => ({
  color: theme.palette.mode === 'dark' ? '#f5f5f5' : '#777777',
  fontSize: 16,
  fontWeight: 400,
  m: 0,
  mb: '0.375rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: 14,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 16,
  }
})

const SubTitle = (props: SubTitleProps) => {
  const { children } = props;

  return <Box component="h3" sx={titleSx}>{children}</Box>;
};

export default SubTitle;
