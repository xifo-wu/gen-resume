import _ from 'lodash';
import type { Theme } from '@mui/material';
import type { ResumeConfig } from '../types';

export default {
  headerBox: (theme: Theme, config: ResumeConfig) => ({
    color: _.get(config, 'themeBgTextColor') || theme.palette.primary.contrastText,
    background: _.get(config, 'themeColor') || theme.palette.primary.main,
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
};
