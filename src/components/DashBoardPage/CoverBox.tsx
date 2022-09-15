import { Box } from '@mui/material';
import styles from './styles';

interface CoverBoxProps {
  img: string;
}

const CoverBox = ({ img }: CoverBoxProps) => {
  return <Box sx={(theme) => styles.cover(theme, img)} />;
};

export default CoverBox;
