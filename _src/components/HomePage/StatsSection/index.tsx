import { Box, Container, Grid, Typography } from '@mui/material';
import { templateLayoutCount } from '@/components/Resume/templateMap';

const data = [
  {
    key: 'resumeCount',
    title: '在线简历数量',
    value: '**',
  },
  {
    key: 'resumeTemplatesCount',
    title: '简历模版数量',
    value: templateLayoutCount,
  },
  {
    key: 'userCount',
    title: '用户数',
    value: '**',
  },
];

const StatsSection = () => {
  // TODO 使用真实数据
  return (
    <Container sx={{ textAlign: 'center', my: 4, }}>
      <Grid container item sx={{ margin: '0 auto' }} lg={9} xs={12}>
        {data.map((item) => (
          <Grid key={item.key} item xs={12} md={4}>
            <Box
              sx={{
                padding: '16px',
                textAlign: 'center',
                lineHeight: '1',
                opacity: '1',
                background: 'transparent',
                color: 'rgb(52, 71, 103)',
                boxShadow: 'none',
              }}
            >
              <Typography sx={{
                fontFamily: 'monospace',
                fontSize: '3rem',
                lineHeight: '1.25',
                fontWeight: '700',
                opacity: '1',
                textTransform: 'none',
                verticalAlign: 'unset',
                color: 'rgb(26, 115, 232)',
                letterSpacing: '-0.125px',
                backgroundImage: 'linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))',
                display: 'inline-block',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                zIndex: '1',
                margin: '0px',
                textDecoration: 'none'
              }}>
                {item.value}
              </Typography>
              <Typography variant='h5' sx={{
                margin: '16px 0px 8px',
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                fontSize: '1.25rem',
                lineHeight: '1.375',
                fontWeight: '700',
                opacity: '1',
                textTransform: 'none',
                verticalAlign: 'unset',
                textDecoration: 'none',
                color: 'rgb(52, 71, 103)',
                letterSpacing: '-0.125px'
              }}>
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default StatsSection;
