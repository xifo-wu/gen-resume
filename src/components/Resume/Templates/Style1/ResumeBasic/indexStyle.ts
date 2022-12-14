import _ from 'lodash';
import type { Theme } from '@mui/material';

export default {
  headerBox: (theme: Theme, themeColor: string) => ({
    color: theme.palette.getContrastText(themeColor),
    background: themeColor || theme.palette.primary.main,
    pt: 6,
    px: 4,
  }),
  headerContentBox: {
    display: 'flex',
    alignItems: 'baseline',
  },
  name: {
    display: 'block',
    fontSize: 38,
    fontWeight: 600,
    maxWidth: '25.3%',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    mr: 2,
    pb: 2,
  },
  infoBox: {
    background: '#EFEFEF',
    width: '100%',
    py: 1,
    paddingLeft: 4,
    paddingRight: 'calc(3.5cm + 64px)',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    flexWrap: 'wrap',
  }
};
