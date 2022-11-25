import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';

// Project Components
import Content1 from '@/components/Resume/ContentBox/Common/Content1';

// Types
import type { ModuleConfig, Other } from '@/components/Resume/types';

// Styles
import styles from './indexStyles';

interface Props {
  data: Other;
}

const OtherContent1 = ({ data }: Props) => {
  const { desc, config: configStr } = data;
  const moduleConfig = helpers.safelyParseJSON(configStr) as ModuleConfig;

  return (
    <Box>
      <Box sx={styles.contentContainer}>
        <Content1>{desc || ''}</Content1>
      </Box>
    </Box>
  );
};

export default OtherContent1;
