import type { ResumeBasicField } from '@/components/Resume/types';
import Typography from '@mui/material/Typography';

interface Props {
  data: ResumeBasicField;
}

const JobTypography = ({ data }: Props) => {
  // 不显示时返回空
  if (!data.visible) {
    return null;
  }

  return (
    <Typography>
      {data.showLabel ? '求职目标：' : null}
      {data.value}
    </Typography>
  );
};

export default JobTypography;
