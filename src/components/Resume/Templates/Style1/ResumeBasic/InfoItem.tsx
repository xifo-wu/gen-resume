// Components
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';

import Link from '@/Link';

// Hooks
import { useTheme } from '@mui/material';

// Types
import type { BasicsDataKeys, ResumeBasicField } from '@/components/Resume/types';

interface Props {
  data: ResumeBasicField & { key: string };
}

const InfoItem = ({ data }: Props) => {
  const theme = useTheme();
  const keyName = data.key as BasicsDataKeys;

  // 不可见和值未空时返回空
  if (!data.visible || !data.value) return null;

  const Label = () => {
    if (!data.showLabel) return null;

    return <Box sx={{ mr: 1 }}>{data.label}</Box>;
  };

  const ValueComponent = () => {
    if (keyName === 'website') {
      return (
        <Link underline="hover" href={data.value} target="_blank">
          {data.value}
        </Link>
      );
    }

    return <Box component="span">{data.value}</Box>;
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
      <Icon sx={{ mr: 1, display: 'block', fontSize: '1rem' }}>{data.icon}</Icon>
      <Label />
      <ValueComponent />
    </Box>
  );
};

export default InfoItem;
