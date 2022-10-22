import type { Theme } from '@mui/material';

export default {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    '@media print': {
      '&:hover': {
        border: 'none',
      },
    },
  },

  name: (theme: Theme, color: string) => ({
    display: 'block',
    fontSize: 38,
    fontWeight: 600,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    mt: 2,
    mr: 2,
    pb: 2,
    color,
  }),

  infoBox: {

  },
};
