import React, { ReactElement } from 'react';
import { AppBar, Avatar, Box, Card, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { NextPageWithLayout } from '../_app';
import DashboardLayout from '@/layouts/dashboardLayout';
import NewResumeButton from '@/components/DashBoardPage/NewResumeButton';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: { xs: 2, md: 3, lg: 0 },
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

const DashBoard: NextPageWithLayout = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            display: 'flex',
            WebkitBoxAlign: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '14.75rem',
            opacity: '1',
            color: 'rgb(52, 71, 103)',
            background:
              'linear-gradient(310deg, rgb(32, 101, 209, 0.6),  rgb(32, 101, 209, 0.3)) 50% center / cover, url("https://images.unsplash.com/photo-1654913041588-312c5dd3e841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80") transparent',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            borderRadius: '1rem',
            borderTopLeftRadius: { xs: 0, lg: '1rem' },
            borderTopRightRadius: { xs: 0, lg: '1rem' },
            backgroundPosition: '50% center',
            overflow: 'hidden',
          }}
        />
        <Card
          sx={{
            color: 'rgba(0, 0, 0, 0.87)',
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '0px',
            overflowWrap: 'break-word',
            backgroundClip: 'border-box',
            border: '0px solid rgba(0, 0, 0, 0.125)',
            borderRadius: '1rem',
            backdropFilter: 'saturate(200%) blur(30px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow:
              'rgba(255, 255, 255, 0.9) 0rem 0rem 0.0625rem 0.0625rem inset, rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem',
            position: 'relative',
            marginTop: { xs: -12, md: -8 },
            mx: { xs: 2, md: 3 },
            p: 2,
          }}
        >
          <Grid container alignItems="center" spacing={{ xs: 3 }}>
            <Grid item>
              <Avatar
                alt="User Name"
                variant="rounded"
                sx={{ width: '4.625rem', height: '4.625rem', borderRadius: '0.75rem' }}
                src="https://www.gravatar.com/avatar/1e005bb217912a9d7262f8e7a22abaad?s=200"
              />
            </Grid>
            <Grid item>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    margin: '0px',
                    fontSize: '1.25rem',
                    lineHeight: 1.375,
                    textTransform: 'none',
                    verticalAlign: 'unset',
                    textDecoration: 'none',
                    color: 'rgb(52, 71, 103)',
                    fontWeight: '500',
                  }}
                >
                  Xifo
                </Typography>
                <Typography
                  sx={{
                    margin: '0px',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.02857em',
                    opacity: '1',
                    textTransform: 'none',
                    verticalAlign: 'unset',
                    textDecoration: 'none',
                    color: 'rgb(103, 116, 142)',
                    fontWeight: '500',
                  }}
                >
                  UserID: 001
                </Typography>
              </Box>
            </Grid>

            <Grid item md={6} lg={4} xs={12} sx={{ margin: '0 0 0 auto' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 100,

                    '& .MuiTabs-indicator': {
                      zIndex: -1,
                      bottom: '0px',
                      width: '100%',
                      height: '100%',
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgb(255, 255, 255)',
                      transition: 'all 500ms ease 0s',
                    },
                  }}
                >
                  <Tab disableRipple label="简历" {...a11yProps(0)} sx={{ flex: '1 1 auto' }} />
                  <Tab
                    disableRipple
                    disabled
                    label="收藏"
                    {...a11yProps(1)}
                    sx={{ flex: '1 1 auto' }}
                  />
                  <Tab
                    disableRipple
                    disabled
                    label="设置"
                    {...a11yProps(2)}
                    sx={{ flex: '1 1 auto' }}
                  />
                </Tabs>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box sx={{ mt: { xs: 2, md: 5 } }}>
        <TabPanel value={value} index={0}>
          <Box>
            <NewResumeButton />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </Box>
  );
};

DashBoard.getLayout = function getLayout(page: ReactElement) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  return <DashboardLayout noPadding={!matches}>{page}</DashboardLayout>;
};

export default DashBoard;
