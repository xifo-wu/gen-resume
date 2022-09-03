import { Box, BoxProps } from '@mui/material';
import styles from './styles';

export interface FullBackgroundAreaProps extends BoxProps {
  src: string;
}

const FullBackgroundArea = ({ src, sx }: FullBackgroundAreaProps) => {
  return (
    <Box sx={{ ...styles.containerSX, ...sx }}>
      <Box sx={() => styles.backgroundBoxSX(src)} />
      <Box className="overlay-bottom" sx={styles.overlayBottomSX} />
    </Box>
  );
};

export default FullBackgroundArea;
