import { colors } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

interface Props {
  selectedItem?: boolean;
}

const EducationContent2Preview = ({ selectedItem }: Props) => {
  const commonSx = { background: colors.grey[300] };
  return (
    <Box
      sx={{ p: 1, width: '100%', ...(selectedItem && { transform: 'scale(0.6633)', my: 0, flex: 1 }) }}
    >
      <Grid container columnSpacing={0.5} rowSpacing={1}>
        <Grid xs={6}>
          <Box sx={{ ...commonSx, width: '100%' }} >
            公司名称
          </Box>
        </Grid>

        <Grid xs="auto">
          <Box sx={{ ...commonSx, width: '100%' }}>
            2022/09- 2022/10
          </Box>
        </Grid>

        <Grid xs textAlign="right">
          <Box sx={{ ...commonSx, width: '100%' }} >
            职称
          </Box>
        </Grid>

        <Grid xs={12}>
          <Box sx={{ ...commonSx, width: '100%', px: 0.5 }}>展示描述字段, 支持 MarkDown 语法</Box>
        </Grid>
      </Grid>

    </Box>
  );
};

export default EducationContent2Preview;
