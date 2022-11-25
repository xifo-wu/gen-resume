import { Box, Typography } from '@mui/material';
import { H1, H2 } from '@/components/CustomMui';
import styles from './indexStyles';

const HomePageBanner = () => {
  return (
    <Box sx={styles.container}>
      <Box className="content-box">
        <Box sx={styles.title}>
          <H1
            sx={{
              background: 'linear-gradient(95deg, #2065d1 45%, #05befe 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline',
            }}
          >
            Gen
          </H1>
          <H1 variant="inherit" sx={{ display: 'inline' }}>
            -Resume
          </H1>
        </Box>
        <H2>&nbsp;快速制作简历</H2>
        <Typography variant="body1" sx={styles.desc}>
          简历在线生成即时预览，海量简历模版随意选择。不定期新增模版。
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePageBanner;
