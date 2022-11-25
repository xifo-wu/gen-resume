// Components
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

import Link from '@/Link';

// Hooks
import { useTheme } from '@mui/material';

// Types
import type { BasicsDataKeys, KVConfig } from '@/components/Resume/types';

interface Props {
  keyName: BasicsDataKeys;
  value: string;
  itemConfig: KVConfig;
}

const InfoItem = ({ keyName, value, itemConfig }: Props) => {
  const theme = useTheme();

  if (!itemConfig.visible || !value) return null;

  const Label = () => {
    if (!itemConfig.showLabel) return null;

    return <Box sx={{ mr: 1 }}>{itemConfig.label}</Box>;
  };

  const ValueComponent = () => {
    if (keyName === 'website') {
      return (
        <Link underline="hover" href={value} target="_blank">
          {value}
        </Link>
      );
    }

    return <Box component="span">{value}</Box>;
  };

  return (
    <Box
      sx={{
        flex: '0 0 calc(50% - 8px)',
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.grey[800],
      }}
    >
      <Icon sx={{mr: 1, display: 'block', fontSize: '1rem' }}>{itemConfig.icon}</Icon>
      <Label />
      <ValueComponent />
    </Box>
  );
};

export default InfoItem;
