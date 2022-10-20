import helpers from '@/utils/helpers';

// Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';

// Project Components
import Content1 from '@/components/Resume/ContentBox/Common/Content1';

// Types
import type { Project, ModuleConfig } from '@/components/Resume/types';

// Styles
import styles from './indexStyles';

interface Props {
  data: Project;
}

const ProjectContent2 = ({ data }: Props) => {
  const { projectDetails = [], config: configStr } = data;
  const moduleConfig = helpers.safelyParseJSON(configStr) as ModuleConfig;

  // TODO 在时间不存在时加长名称宽度。专业名称同理。
  return (
    <Box>
      {projectDetails.map((project, index) => (
        <Box key={project.id} sx={styles.contentContainer}>
          <Grid container spacing={2}>
            <Grid xs={6}>{project.name}</Grid>

            <Grid xs="auto">
              {project.startOn}-{project.endOn}
            </Grid>

            <Grid xs textAlign="right">
              {project.role}
            </Grid>

            <Grid xs={12}>
              <Content1>{project.desc || ''}</Content1>
            </Grid>
          </Grid>

          {moduleConfig.showDivider && index !== projectDetails.length - 1 && (
            <Divider sx={{ my: 1 }} />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProjectContent2;
