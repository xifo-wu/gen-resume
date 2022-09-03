import { Box } from '@mui/material';
import styles from './styles';

export interface FullBackgroundAreaProps {
  src: string;
}

const FullBackgroundArea = ({ src }: FullBackgroundAreaProps) => {
  return (
    <Box sx={styles.containerSX}>
      <Box sx={() => styles.backgroundBoxSX(src)} />
      <Box className="overlay-bottom" sx={styles.overlayBottomSX} />
    </Box>
  );
};

export default FullBackgroundArea;
