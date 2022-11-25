import { Theme } from '@mui/material';

const layoutSX = (theme: Theme) => ({
  height: '100%',
  minHeight: '100vh',
  background: theme.palette.mode === 'dark' ? '#161c24' : '#f5f5f7',
});

export default { layoutSX };
