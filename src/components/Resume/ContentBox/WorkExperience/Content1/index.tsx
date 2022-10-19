import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// Project Components
import Content1 from '@/components/Resume/ContentBox/Common/Content1';

// Types
import type { ModuleConfig, WorkExperience } from '@/components/Resume/types';

// Styles
import styles from './indexStyles';

interface Props {
  data: WorkExperience;
}

const WorkExperienceContent1 = ({ data }: Props) => {
  const { workExperienceDetails = [], config: configStr } = data;
  const moduleConfig = helpers.safelyParseJSON(configStr) as ModuleConfig;

  return (
    <Box>
      {(workExperienceDetails || []).map((workExperience, index) => (
        <Box key={workExperience.id} sx={styles.contentContainer}>
          <Content1>{workExperience.desc || ''}</Content1>
          {moduleConfig.showDivider && index !== workExperienceDetails.length - 1 && (
            <Divider sx={{ my: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default WorkExperienceContent1;
