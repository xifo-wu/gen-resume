import React from 'react';
import Box from '@mui/material/Box';
import { darken } from '@mui/material';
import type { Theme } from '@mui/material';

interface ContainerProps {
  children: React.ReactNode;
}

const containerSx = (theme: Theme) => ({
  p: 4,
  [theme.breakpoints.down('sm')]: {
    pt: 3,
    px: 2,
    pb: 2,
  }
});


const ContentContainer = ({ children }: ContainerProps) => {
  return (
    <Box sx={containerSx}>
      { children }
    </Box>
  );
};

export default ContentContainer;
