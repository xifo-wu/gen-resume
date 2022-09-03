import { Box, Button, Container, Typography, useMediaQuery } from '@mui/material';
import { H1 } from '../CustomMui';
import FullBackgroundArea from '../FullBackgroundArea';
import styles from './styles';

const BrandBanner = () => {
  const matches = useMediaQuery('(max-width: 750px)');

  return (
    <Box sx={styles.brandBannerContainer}>
      <FullBackgroundArea src="https://images.unsplash.com/photo-1648315156503-5335899e3470?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
      <Container>
        <Box sx={styles.contentBox}>
          <H1>
            <Typography
              variant="inherit"
              sx={(theme) => ({
                display: matches ? 'block' : 'inline',
                color: theme.palette.primary.main,
              })}
            >
              Gen-Resume
            </Typography>
            &nbsp;快速制作简历
          </H1>
          <Typography variant="body1" sx={{ my: 4, color: '#d2d2d2' }}>
            海量简历模版随意选择、隐私数据加密，保护你的隐私。用爱发电，拿起你的小手 Star 一下
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button sx={{ borderRadius: 24, mx: 1 }} variant="contained" size="large">
              开始使用
            </Button>
            <Button
              sx={{ borderRadius: 24, mx: 1, color: '#fff', borderColor: '#fff' }}
              variant="outlined"
              size="large"
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BrandBanner;
