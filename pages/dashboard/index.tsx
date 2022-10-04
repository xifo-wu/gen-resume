import React, { ReactElement } from 'react';
import {
  Avatar,
  Box,
  Card,
  Grid,
  styled,
  Tab,
  Tabs,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import dayjs from 'dayjs';

import { NextPageWithLayout } from '../_app';
import useUser from '@/hooks/useUser';
import DashboardLayout from '@/layouts/dashboardLayout';
import CoverBox from '@/components/DashBoardPage/CoverBox';
import NewResumeButton from '@/components/DashBoardPage/NewResumeButton';
import styles from '@/components/DashBoardPage/styles';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

const StyledImage = styled(Image)(({ theme }) => ({
  borderRadius: '1rem',
}));

const DashBoard: NextPageWithLayout = () => {
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { user = {} } = useUser();
  const { data = [], error, loading } = useApi('/api/v1/resumes');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderResumeList = () => {
    if (error) {
      return <Grid item>获取简历错误</Grid>;
    }

    return data.map((item: any) => (
      <Grid key={item.id} item xs={6} sm="auto">
        <Box
          onClick={() => router.push(`/${user.username}/${item.slug}/edit`)}
          sx={(theme) => ({
            position: 'relative',
            cursor: 'pointer',
            width: 264,
            height: 372,
            borderRadius: '1rem',
            background: '#fff',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
              height: 232,
            },
          })}
        >
          <StyledImage layout="fill" objectFit="cover" src={item.cover} />
        </Box>

        <Box sx={{ ml: 1, mt: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: '.875rem',
              fontWeight: '600',
              lineHeight: 1.625,
              color: '#333',
            }}
          >
            {item.name}
          </Typography>
          <Typography
            sx={{
              fontSize: '.625rem',
              color: 'rgb(103, 116, 142)',
              fontWeight: '400',
              lineHeight: 1.625,
            }}
          >
            最后更新于 2 小时前
          </Typography>
        </Box>
      </Grid>
    ));
  };

  return (
    <Box>
      <Box sx={{ position: 'relative' }}>
        <CoverBox img="https://images.unsplash.com/photo-1654913041588-312c5dd3e841?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
        <Card sx={styles.infoBox}>
          <Grid container alignItems="center" spacing={{ xs: 3 }}>
            <Grid item>
              <Avatar alt={user.username} variant="rounded" sx={styles.avatar} src={user.gravatar} />
            </Grid>
            <Grid item>
              <Box>
                <Typography variant="h5" sx={styles.nickname}>
                  {user.nickname}
                </Typography>
                <Typography sx={styles.desc}>邮箱: {user.email}</Typography>
              </Box>
            </Grid>

            <Grid item md={6} lg={4} xs={12} sx={{ margin: '0 0 0 auto' }}>
              <Tabs value={value} onChange={handleChange} sx={styles.tabs}>
                <Tab disableRipple label="简历" sx={{ flex: '1 1 auto' }} />
                <Tab disableRipple disabled label="收藏" sx={{ flex: '1 1 auto' }} />
                <Tab disableRipple disabled label="设置" sx={{ flex: '1 1 auto' }} />
              </Tabs>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Box sx={{ mt: { xs: 2, md: 5 } }}>
        <TabPanel value={value} index={0}>
          <Grid spacing={3} container>
            <Grid item xs={6} sm="auto">
              <NewResumeButton />
            </Grid>

            {renderResumeList()}
          </Grid>
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
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashBoard;
