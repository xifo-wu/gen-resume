import { lighten } from '@mui/material';

// Hooks
import { useTheme } from '@mui/material';

// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Types
import type { ResumeConfig, ModuleBase } from '@/components/Resume/types';

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
        ...(selectedItem && { transform: 'scale(0.6633)', my: 0, flex: 1 })
      }}
    >
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box sx={{ background: lighten('#EFEFEF', 0.5), width: 20 }} />
        <Box
          sx={{
            background: lighten('#EFEFEF', 0.5),
            width: '100%',
            ml: 1,
            pl: 0.5,
            py: 0.5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: 20,
              fontWeight: 600,
              color: config.themeColor || theme.palette.primary.main,
            }}
          >
            {label}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ModuleTitle;
