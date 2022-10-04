import React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@/Link';

export interface SimpleAppBarLayoutProps {
  children?: React.ReactNode;
  titleColor?: string;
}

const SimpleAppBarLayout = (props: SimpleAppBarLayoutProps) => {
  const { children, titleColor = '#fff' } = props;

  return (
    <>
      <AppBar elevation={0} position="fixed" color="transparent">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              className="title"
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                flexGrow: 1,
                color: titleColor,
              }}
            >
              Gen-Resume
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      {children}
    </>
  );
};

export default SimpleAppBarLayout;
