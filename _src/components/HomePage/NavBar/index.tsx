import React from 'react';
import { Avatar, Box, Button, Container, Grid, Tooltip } from '@mui/material';
import router from 'next/router';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoSectionWithoutSlogan from '@/components/Logo/WithoutSlogan';
import useUser from '@/hooks/useUser';
import styles from './indexStyles';

const NeedUser = ({ flag, children }: { flag: Boolean; children: React.ReactElement }) => {
  if (!flag) return null;

  return children;
};

const HomePageNavBar = () => {
  const { user = {} } = useUser();

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Box sx={styles.contentBox}>
        <Grid container alignItems="center">
          <Grid item xs="auto">
            <Box sx={styles.logoBox}>
              <LogoSectionWithoutSlogan />
            </Box>
          </Grid>
          <Grid item xs sx={{ textAlign: 'right' }}>
            <Box sx={{ px: 2 }}>
              <NeedUser flag={!!user.id}>
                <Button
                  className="menu-item"
                  color="inherit"
                  onClick={() => router.push('/dashboard')}
                >
                  控制台
                </Button>
              </NeedUser>
            </Box>
          </Grid>
          <Grid item xs="auto" sx={styles.avatarBox}>
            {user.id ? (
              <Avatar alt={user.nickname} src={user.gravatar} />
            ) : (
              <Tooltip title="前往登录">
                <AccountCircleIcon sx={styles.avatarIcon} onClick={() => router.push('/login')} />
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePageNavBar;
