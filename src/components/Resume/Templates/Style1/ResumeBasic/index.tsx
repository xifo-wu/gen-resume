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
import type { BasicsData, BasicsDataKeys, ResumeBasicField } from '@/components/Resume/types';

interface ResumeBasicProps {
  themeColor: string;
  data: BasicsData;
}

const ResumeBasic = (props: ResumeBasicProps) => {
  const { data, themeColor } = props;

  // 数据不存在时不渲染
  if (_.isEmpty(data)) return null;

  // 个人基础信息
  const infoItemsObj = _.pick(data, [
    'mobile',
    'email',
    'educationalQualifications',
    'website',
    'birthday',
    'age',
  ]);

  const infoItems = _.map(infoItemsObj, (item, key) => ({
    key,
    ...item,
  })).filter((item) => item.id);

  return (
    <Box>
      <Box className="header-box" sx={(theme) => styles.headerBox(theme, themeColor)}>
        <Box className="header-content-box" sx={styles.headerContentBox}>
          <Typography className="name" variant="h1" sx={styles.name}>
            {data.name.value}
          </Typography>
          <JobTypography data={data.job} />
        </Box>

        {data.avatar.visible && (
          <Box sx={{ position: 'absolute', top: 16, right: 32, width: '3.5cm', height: '5.2cm' }}>
            <Box
              component="img"
              src={data.avatar.value}
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
        {_.map(infoItems, (item) => {
          return <InfoItem key={item.id} data={item} />;
        })}
      </Box>
    </Box>
  );
};

export default ResumeBasic;
