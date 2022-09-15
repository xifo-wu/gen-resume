import { useEffect, useMemo } from 'react';
import type { ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Container, styled } from '@mui/material';
import { useRouter } from 'next/router';
import styles from './styles';
import Logo from '@/components/Logo';
import { toast, ToastContainer } from 'react-toastify';
import useUser from '@/hooks/useUser';

export interface DashboardLayoutProps {
  children?: ReactElement;
}

const variants = {
  out: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.75,
    },
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: 0.5,
    },
  },
};

const MotionDiv = styled(motion.div)({
  position: 'fixed',
  p: 3,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 99999,
  width: '100vw',
  height: '100vh',
  backdropFilter: 'saturate(200%) blur(30px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;
  const router = useRouter();
  const { loading, user } = useUser();

  const toastConfig = useMemo(
    () => ({
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    }),
    [],
  );

  useEffect(() => {
    if (!(user || loading)) {
      toast.error('登录失效，请重新登录', toastConfig);
      void router.push('/login');
    }
  }, [loading, user]);

  return (
    <Box sx={styles.layoutSX}>
      <AnimatePresence initial={false} exitBeforeEnter>
        {loading && (
          <MotionDiv variants={variants} animate="in" initial="out" exit="out">
            <Box sx={{ width: 500, height: 500 }}>
              <Logo />
            </Box>
          </MotionDiv>
        )}
      </AnimatePresence>
      <Container
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
