import { colors, lighten } from '@mui/material';

import Box from '@mui/material/Box';

interface Props {
  selectedItem?: boolean;
}

const EducationContent1Preview = ({ selectedItem }: Props) => {
  const commonSx = { background: colors.grey[300], my: 0.5 };
  return (
    <Box
      sx={{ width: '100%', ...(selectedItem && { transform: 'scale(0.6633)', my: 0, flex: 1 }) }}
    >
      <Box sx={{ ...commonSx, width: '75%', px: 0.5 }}>纯文本模式</Box>
      <Box sx={{ ...commonSx, width: '90%', px: 0.5 }}>只展示描述字段, 支持 MarkDown 语法</Box>
    </Box>
  );
};

export default EducationContent1Preview;
