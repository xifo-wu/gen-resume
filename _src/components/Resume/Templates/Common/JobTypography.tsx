import React from 'react';
import helpers from '@/components/Resume/helpers';

// Components
import Typography from '@mui/material/Typography';

// Types
import type { KVConfig } from '@/components/Resume/types';

interface Props {
  config: string;
  children: React.ReactNode;
}

const JobTypography = ({ config, children }: Props) => {
  const configObj: KVConfig = helpers.jsonParse(config);

  // 不显示时返回空
  if (!configObj.visible) {
    return null;
  }

  return (
    <Typography>
      {configObj.showLabel ? '求职目标：' : null}
      {children}
    </Typography>
  );
};

export default JobTypography;
