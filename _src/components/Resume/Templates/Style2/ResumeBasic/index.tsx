import React from 'react';
import _ from 'lodash';
import { Box, Typography, Grid } from '@mui/material';
import type {
  BasicsDataKeysConfig,
  BasicsDataKeys,
  KVConfig,
  BasicsData,
  ResumeConfig,
} from '@/components/Resume/types';
import JobTypography from '../../Common/JobTypography';
import InfoItem from '../../Common/InfoItem';
import helpers from '@/components/Resume/helpers';
import styles from '../indexStyles';
import ParallelogramColorSatin from '../Common/ParallelogramColorSatin';

interface Props {
  data: BasicsData;
  config: ResumeConfig;
}

const ResumeBasic = (props: Props) => {
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
    <>
      <Box sx={{ mx: 3 }}>
        <Grid container alignContent="center" spacing={2} sx={{ mt: 4 }}>
          <Grid item xs>
            {/* TODO 颜色自定义 */}
            <Box sx={{ mb: 2 }}>
              <Typography
                className="name"
                variant="h1"
                sx={(theme) => styles.name(theme, '#9A1E36')}
              >
                {data.name}
              </Typography>
              <JobTypography config={data.jobConfig}>{data.job}</JobTypography>
            </Box>
          </Grid>
          <Grid item xs sx={{ position: 'relative' }}>
            {data.avatar && avatarConfig.visible && (
              <Box
                sx={(theme) => ({
                  border: `8px solid ${theme.palette.background.paper}`,
                  width: '5cm',
                  height: '5cm',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'absolute',
                  textAlign: 'center',
                  m: 'auto',
                  left: 0,
                  right: 0,
                  top: 50,
                  bottom: 0,
                  zIndex: 11,
                })}
              >
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
          </Grid>
          <Grid item xs>
            <Box sx={styles.infoBox}>
              {_.map(infoItems, (item: string, key: BasicsDataKeys) => {
                const itemConfig: KVConfig = helpers.jsonParse(
                  data[`${key}Config` as BasicsDataKeysConfig],
                );

                return <InfoItem key={key} keyName={key} value={item} itemConfig={itemConfig} />;
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ParallelogramColorSatin color="#9A1E36" />
    </>
  );
};

export default ResumeBasic;
