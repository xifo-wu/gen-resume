import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// Project Components
import Content1 from '@/components/Resume/ContentBox/Common/Content1';

// Types
import type { ModuleConfig, Project } from '@/components/Resume/types';

// Styles
import styles from './indexStyles';

interface Props {
  data: Project;
}

const ProjectContent1 = ({ data }: Props) => {
  const { projectDetails = [], config: configStr } = data;
  const moduleConfig = helpers.safelyParseJSON(configStr) as ModuleConfig;

  return (
    <Box>
      {(projectDetails || []).map((project, index) => (
        <Box key={project.id} sx={styles.contentContainer}>
          <Content1>{project.desc || ''}</Content1>
          {moduleConfig.showDivider && index !== projectDetails.length - 1 && (
            <Divider sx={{ my: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProjectContent1;
