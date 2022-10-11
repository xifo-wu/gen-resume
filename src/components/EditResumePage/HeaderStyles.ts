import type { Theme } from '@mui/material';

export default {
  logoAndTogglerButton: (theme: Theme) => ({
    width: 256,
    px: 0,
    display: 'flex',
    [theme.breakpoints.down('md')]: { width: 'auto' },
  }),
  logo: { pt: 1, display: { xs: 'none', md: 'block' }, flexGrow: 1 },
  togglerButton: { ml: { xs: 0, md: 3 } },
};
