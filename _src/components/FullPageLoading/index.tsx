import { Box, styled } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '../Logo';

interface FullPageLoadingProps {
  loading?: boolean;
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

const FullPageLoading = ({ loading }: FullPageLoadingProps) => {
  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      {loading && (
        <MotionDiv variants={variants} animate="in" initial="out" exit="out">
          <Box sx={{ width: 500, height: 500 }}>
            <Logo />
          </Box>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default FullPageLoading;
