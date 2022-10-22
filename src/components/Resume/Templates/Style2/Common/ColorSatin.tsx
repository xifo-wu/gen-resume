import _ from 'lodash';
import { darken, lighten } from '@mui/material';
import Box from '@mui/material/Box';

interface Props {
  direction?: 'left' | 'right';
  height?: number;
  color: string;
}

const ColorSatin = (props: Props) => {
  const { height = 32, direction = 'left', color } = props;

  const commonSx = {
    flex: 1,
  };

  const array = [
    <Box key="1" sx={{ ...commonSx, background: darken(color, 1) }} />,
    <Box key="2" sx={{ ...commonSx, background: darken(color, 0.5) }} />,
    <Box key="3" sx={{ ...commonSx, background: color }} />,
    <Box key="4" sx={{ ...commonSx, background: lighten(color, 0.2) }} />,
    <Box key="5" sx={{ ...commonSx, background: lighten(color, 0.35) }} />,
  ];

  return (
    <Box sx={{ height, display: 'flex' }}>
      {direction === 'left' && array}
      {direction === 'right' && _.reverse(array)}
    </Box>
  );
};

export default ColorSatin;
