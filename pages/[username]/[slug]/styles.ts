import { Theme } from '@mui/material';

const layoutSX = (theme: Theme) => ({
  height: '100vh',
  width: '100vw',
  background: theme.palette.mode === 'dark' ? '#161c24' : '#f5f5f7',
  display: 'flex',
});

export default { layoutSX };
