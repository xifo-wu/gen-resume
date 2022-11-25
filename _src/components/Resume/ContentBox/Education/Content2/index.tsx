import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

// Project Components
import Content1 from '@/components/Resume/ContentBox/Common/Content1';

// Types
import type { Education, ModuleConfig } from '@/components/Resume/types';

// Styles
import styles from './indexStyles';

interface Props {
  data: Education;
}

const EducationContent1 = ({ data }: Props) => {
  const { educationDetails = [], config: configStr } = data;
  const moduleConfig = helpers.safelyParseJSON(configStr) as ModuleConfig;

  // TODO 在时间不存在时加长名称宽度。专业名称同理。
  return (
    <Box>
      {educationDetails.map((education, index) => (
        <Box key={education.id} sx={styles.contentContainer}>
          <Grid container spacing={2}>
            <Grid xs={6}>{education.name}</Grid>

            <Grid xs="auto">
              {education.startOn}-{education.endOn}
            </Grid>

            <Grid xs textAlign="right">
              {education.universityMajors}
            </Grid>

            <Grid xs={12}>
              <Content1>{education.desc || ''}</Content1>
            </Grid>
          </Grid>

          {moduleConfig.showDivider && index !== educationDetails.length - 1 && <Divider sx={{ my: 1 }} />}
        </Box>
      ))}
    </Box>
  );
};

export default EducationContent1;
