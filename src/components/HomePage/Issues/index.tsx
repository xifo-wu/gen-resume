import { Box, Button, Container, Typography } from '@mui/material';

const Issues = () => {
  return (
    <Box
      sx={(theme) => ({
        zIndex: 99,
        background: theme.palette.background.default,
        pb: 10,
      })}
    >
      <Container>
        <Box
          sx={{
            pt: 5,
            textAlign: 'center',
            mb: 8,
          }}
        >
          <Typography
            sx={{
              background:
                'linear-gradient(95deg, #1c7ed6 15%, #22b8cf 45%, #FB5343 75%, #6549D5 100%) 98%/200% 100%',
              textTransform: 'capitalize',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              fontFamily: 'Public Sans,sans-serif',
              display: 'inline-block',
            }}
          >
            Issues
          </Typography>
          <Typography
            variant="h4"
            sx={{
              margin: '0',
              fontWeight: '700',
              lineHeight: '1.3333333333333333',
              fontSize: '2rem',
              '@media (min-width: 600px)': {
                fontSize: '2.5rem',
              },
              '@media (min-width: 900px)': {
                fontSize: '2.75rem',
              },
            }}
          >
            有反馈意见？
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1">
            可以使用 GitHub Issues 来反馈问题，欢迎提交 Bug、简历模版样式以及意见
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 4,
              boxShadow: 'rgba(32, 101, 209, 0.24) 0px 8px 16px 0px',
            }}
          >
            提交反馈
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Issues;
