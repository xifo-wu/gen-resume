import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import styles from './ModuleItemCardStyle';

interface ModuleItemCardProps {
  data: {
    id: string;
    name: string;
    en: string;
  };
}

const ModuleItemCard = (props: ModuleItemCardProps) => {
  const { data } = props;

  return (
    <Box sx={styles.container}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs="auto">
          <Box sx={styles.grabBox}>
            <OpenWithIcon sx={styles.grabIcon} />
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box>
            <Typography sx={styles.enTitle}>{data.en}</Typography>
            <Typography variant="h5" sx={styles.title}>
              {data.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Box sx={styles.editBox}>
            <EditOutlinedIcon sx={styles.editIcon} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModuleItemCard;
