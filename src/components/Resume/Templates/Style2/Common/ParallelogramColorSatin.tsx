import _ from 'lodash';
import { darken, lighten } from '@mui/material';
import Box from '@mui/material/Box';

interface Props {
  color: string;
}

const ParallelogramColorSatin = ({ color }: Props) => {
  const commonSx = {
    flex: 1,
    display: 'inline-block',
    zIndex: 2,
  };

  return (
    <Box sx={{ height: 16, display: 'flex' }}>
      <Box
        sx={{
          background: darken(color, 1),
        }}
      />
      <Box sx={{ ...commonSx, background: darken(color, 0.5) }} />
      <Box sx={{ ...commonSx, background: color }} />
      <Box sx={{ ...commonSx, background: lighten(color, 0.2) }} />
      <Box sx={{ ...commonSx, background: lighten(color, 0.35) }} />
      <Box sx={{ ...commonSx, background: lighten(color, 0.35) }} />
      <Box sx={{ ...commonSx, background: lighten(color, 0.2) }} />
      <Box sx={{ ...commonSx, background: color }} />
      <Box sx={{ ...commonSx, background: darken(color, 0.5) }} />
      <Box
        sx={{
          background: darken(color, 1),
        }}
      />
    </Box>
  );
};

export default ParallelogramColorSatin;
