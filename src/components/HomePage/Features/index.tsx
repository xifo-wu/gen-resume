import { Grid, Box, Container, Paper, Typography } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

const bsx = {
  backgroundColor: '#fff',
  color: '#212B36',
  transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  backgroundImage: 'none',
  overflow: 'hidden',
  position: 'relative',
  borderRadius: '16px',
  zIndex: '0',
  border: '0',
  maxWidth: '380px',
  minHeight: '440px',
  margin: 'auto',
  textAlign: 'center',
  padding: '80px 40px 0px',
  boxShadow: '0 12px 24px -4px rgba(145, 158, 171, 0.16)',
  '@media (min-width: 900px)': {
    boxShadow: 'none',
    backgroundColor: '#F4F6F8',
  },
};

const HomePageFeatures = () => {
  return (
    <Box
      sx={(theme) => ({
        zIndex: 99,
        pb: 10,
      })}
    >
      <Container>
        <Box
          sx={{
            pt: 5,
            textAlign: 'center',
            mb: 10,
            '@media (min-width: 900px)': {
              mb: 25,
            },
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
            Features
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
            ??????????????????
          </Typography>
        </Box>

        <Box>
          <Grid container spacing={10}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  ...bsx,
                  '@media (min-width: 900px)': {
                    marginTop: -5,
                    boxShadow: 'none',
                    backgroundColor: '#F4F6F8',
                  },
                }}
              >
                <Box
                  sx={{
                    lineHeight: '1',
                    display: 'block',
                    overflow: 'hidden',
                    marginBottom: '80px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    filter: 'drop-shadow(2px 2px 2px rgba(0, 171, 85, 0.48))',
                  }}
                >
                  <AutoFixHighIcon sx={{ fontSize: 48, color: 'rgb(0, 171, 85)' }} />
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    margin: 0,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    fontSize: '1.125rem',
                    marginBottom: 2,
                  }}
                >
                  ?????????
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    margin: '0',
                    lineHeight: '1.5',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#637381',
                  }}
                >
                  ???????????????????????????????????????????????????
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  ...bsx,
                  '@media (min-width: 900px)': {
                    marginTop: -10,
                    backgroundColor: '#fff',
                    boxShadow: '-40px 40px 80px 0 rgba(145, 158, 171, 0.4)',
                  },
                }}
              >
                <Box
                  sx={{
                    lineHeight: '1',
                    display: 'block',
                    overflow: 'hidden',
                    marginBottom: '80px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    filter: 'drop-shadow(2px 2px 2px rgba(32, 101, 209, 0.48))',
                  }}
                >
                  <GridViewOutlinedIcon sx={{ fontSize: 48, color: 'rgb(32, 101, 209)' }} />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    margin: 0,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    fontSize: '1.125rem',
                    marginBottom: 2,
                  }}
                >
                  ????????????
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    margin: '0',
                    lineHeight: '1.5',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#637381',
                  }}
                >
                  ?????????????????????????????????????????????????????????????????????????????????
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  ...bsx,
                  '@media (min-width: 900px)': {
                    boxShadow: 'none',
                    backgroundColor: '#F4F6F8',
                  },
                }}
              >
                <Box
                  sx={{
                    lineHeight: '1',
                    display: 'block',
                    overflow: 'hidden',
                    marginBottom: '80px',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    filter: 'drop-shadow(2px 2px 2px rgba(253, 169, 45, 0.48))',
                  }}
                >
                  <CodeIcon sx={{ fontSize: 48, color: 'rgb(253, 169, 45)' }} />
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    margin: 0,
                    fontWeight: 700,
                    lineHeight: 1.5,
                    fontSize: '1.125rem',
                    marginBottom: 2,
                  }}
                >
                  ????????????
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    margin: '0',
                    lineHeight: '1.5',
                    fontSize: '1rem',
                    fontWeight: '400',
                    color: '#637381',
                  }}
                >
                  ????????????????????????????????????????????????
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePageFeatures;
