import { useEffect } from 'react';
import type { ReactElement } from 'react';;
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './styles';
import { toast } from 'react-toastify';
import useUser from '@/hooks/useUser';
import FullPageLoading from '@/components/FullPageLoading';

export interface DashboardLayoutProps {
  children?: ReactElement;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;
  const router = useRouter();
  const { loading, user } = useUser();

  useEffect(() => {
    if (!(user || loading)) {
      toast.error('登录失效，请重新登录');
      void router.push('/login');
    }
  }, [loading, user]);

  return (
    <Box sx={styles.layoutSX}>
      <FullPageLoading loading={loading} />
      <Container
        maxWidth="xl"
        sx={{
          transition:
            'margin-left 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, margin-right 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          p: {
            lg: 3,
            xs: 0,
          },
          position: 'relative',
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default DashboardLayout;
