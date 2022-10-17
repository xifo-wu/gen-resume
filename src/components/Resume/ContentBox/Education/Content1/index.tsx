import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

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
  console.log(data, 'data');
  return (
    <Box>
      {educationDetails.map((education, index) => (
        <Box key={education.id} sx={styles.contentContainer}>
          <Content1>{education.desc || ''}</Content1>
          {moduleConfig.showDivider && <Divider sx={{ my: 1 }} />}
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default EducationContent1;
