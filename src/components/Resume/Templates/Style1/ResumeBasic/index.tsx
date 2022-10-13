import React from 'react';
import _ from 'lodash';

// Components
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Project Components
import InfoItem from './InfoItem';
import JobTypography from './JobTypography';

// Styles
import styles from './indexStyle';

// Types
import type {
  BasicsData,
  BasicsDataKeys,
  BasicsDataKeysConfig,
  KVConfig,
  ResumeConfig,
} from '@/components/Resume/types';
import helpers from '@/components/Resume/helpers';

interface ResumeBasicProps {
  data: BasicsData;
  config: ResumeConfig;
}

// ==================================== ResumeBasic ==================================== //

const ResumeBasic = (props: ResumeBasicProps) => {
  const { data, config } = props;
  if (_.isEmpty(data)) return null;

  // 个人基础信息
  const infoItems = _.pick(data, [
    'mobile',
    'email',
    'educationalQualifications',
    'website',
    'birthday',
    'age',
  ]);

  const avatarConfig: KVConfig = React.useMemo(() => {
    return helpers.jsonParse(data.avatarConfig);
  }, [data.avatarConfig]);

  return (
    <Box>
      <Box className="header-box" sx={(theme) => styles.headerBox(theme, config)}>
        <Box className="header-content-box" sx={styles.headerContentBox}>
          <Typography className="name" variant="h1" sx={styles.name}>
            {data.name}
          </Typography>
          <JobTypography config={data.jobConfig}>{data.job}</JobTypography>
        </Box>

        {data.avatar && avatarConfig.visible && (
          <Box sx={{ position: 'absolute', top: 16, right: 32, width: '3.5cm', height: '5.2cm' }}>
            <Box
              component="img"
              src={data.avatar}
              sx={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
              }}
            />
          </Box>
        )}
      </Box>

      {/* 信息内容的宽度应该是 100% - 左右两边 Padding - 照片宽 - 右 Padding (让文字和照片有间距) */}
      <Box sx={styles.infoBox}>
        {_.map(infoItems, (item: string, key: BasicsDataKeys) => {
          const itemConfig: KVConfig = helpers.jsonParse(
            data[`${key}Config` as BasicsDataKeysConfig],
          );

          return <InfoItem key={key} keyName={key} value={item} itemConfig={itemConfig} />;
        })}
      </Box>
    </Box>
  );
};

export default ResumeBasic;
