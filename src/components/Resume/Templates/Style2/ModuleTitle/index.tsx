import { lighten } from '@mui/material';

// Hooks
import { useTheme } from '@mui/material';

// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Types
import type { ResumeConfig, ModuleBase } from '@/components/Resume/types';
import ColorSatin from '../Common/ColorSatin';

interface Props {
  selectedItem?: boolean;
  config?: ResumeConfig;
  data: Partial<ModuleBase>;
}

const ModuleTitle = ({
  config = {
    themeColor: '',
    themeBgTextColor: '',
  },
  data,
  selectedItem,
}: Props) => {
  const theme = useTheme();
  const { label, visible } = data;

  return (
    <Box
      sx={{
        display: visible ? 'block' : 'none',
        my: 1,
        ml: 3,
        ...(selectedItem && { transform: 'scale(0.6633)', my: 0, flex: 1 }),
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontSize: 20,
          fontWeight: 600,
          color: lighten('#9A1E36', 0.2),
          ml: 0.5,
          mb: 0.5,
        }}
      >
        {label}
      </Typography>
      <Box sx={{ maxWidth: '20%' }}>
        <ColorSatin color="#9A1E36" height={4} />
      </Box>
    </Box>
  );
};

export default ModuleTitle;
