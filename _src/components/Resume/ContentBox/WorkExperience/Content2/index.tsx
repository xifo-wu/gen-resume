import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

// Project Components
import Content1 from '@/components/Resume/ContentBox/Common/Content1';

// Types
import type { WorkExperience, ModuleConfig } from '@/components/Resume/types';

// Styles
import styles from './indexStyles';

interface Props {
  data: WorkExperience;
}

const WorkExperienceContent2 = ({ data }: Props) => {
  const { workExperienceDetails = [], config: configStr } = data;
  const moduleConfig = helpers.safelyParseJSON(configStr) as ModuleConfig;

  // TODO 在时间不存在时加长名称宽度。专业名称同理。
  return (
    <Box>
      {workExperienceDetails.map((workExperience, index) => (
        <Box key={workExperience.id} sx={styles.contentContainer}>
          <Grid container spacing={2}>
            <Grid xs={6}>{workExperience.name}</Grid>

            <Grid xs="auto">
              {workExperience.startOn}-{workExperience.endOn}
            </Grid>

            <Grid xs textAlign="right">
              {workExperience.jobTitle}
            </Grid>

            <Grid xs={12}>
              <Content1>{workExperience.desc || ''}</Content1>
            </Grid>
          </Grid>

          {moduleConfig.showDivider && index !== workExperienceDetails.length - 1 && (
            <Divider sx={{ my: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default WorkExperienceContent2;
