import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import styles from './ModuleItemCardStyle';
import type { Theme } from '@mui/material';

export interface ModuleItemCardProps {
  selected?: boolean;
  data: {
    id: string;
    name: string;
    en: string;
  };
  onClick?: (id: string, data: ModuleItemCardProps['data']) => void;
}

const iconSX = (theme: Theme) => ({
  cursor: 'pointer',
  width: '2rem',
  height: '2rem',
  marginLeft: 'auto',
  display: 'flex',
  WebkitBoxPack: 'center',
  justifyContent: 'center',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  opacity: '1',
  color: theme.palette.primary.main,
  borderRadius: 1,
});

const ModuleItemCard = (props: ModuleItemCardProps) => {
  const { data, selected, onClick } = props;

  const handleClick = () => {
    onClick?.(data.id, data);
  }

  return (
    <Box sx={{ ...styles.container, cursor: 'pointer', userSelect: 'none' }} onClick={handleClick}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={7}>
          <Box>
            <Typography sx={styles.enTitle}>{data.en}</Typography>
            <Typography variant="h5" sx={styles.title}>
              {data.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          {selected ? <CheckBoxIcon sx={iconSX} /> : <CheckBoxOutlineBlankIcon sx={iconSX} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModuleItemCard;
