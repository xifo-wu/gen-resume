import _ from 'lodash';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import styles from './ResumeBasicStyles';
import type { BasicsData, ResumeConfig } from '../types';

interface ResumeBasicProps {
  // 数据
  data: BasicsData;
  // 总配置
  config: ResumeConfig;
}

// TODO 支持配置项
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

  return (
    <Box>
      <Box className="header-box" sx={(theme) => styles.headerBox(theme, config)}>
        <Box className="header-content-box" sx={styles.headerContentBox}>
          <Typography className="name" variant="h1" sx={styles.name}>
            {data.name}
          </Typography>
          <Typography>求职目标： {data.job}</Typography>
        </Box>

        {/* 信息内容的宽度应该是 100% - 左右两边 Padding - 照片宽 - 右 Padding (让文字和照片有间距) */}
        {/* <Box
              sx={{
                background: '#EFEFEF',
                width: '100%',
                py: 1,
                paddingLeft: 4,
                paddingRight: 'calc(3.5cm + 64px)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {_.map(infoItems, (item, key) => {
                return (
                  <Box
                    key={key}
                    sx={{ flex: '0 0 calc(50% - 8px)', display: 'flex', alignItems: 'center' }}
                  >
                    {item.isShowLabel ? `${item.label}：` : null}
                    {
                      // todo 支持 email
                      key === 'website' ? (
                        <Link underline="hover" href={item.value} target="_blank">
                          {item.value}
                        </Link>
                      ) : (
                        item.value
                      )
                    }
                  </Box>
                );
              })}
            </Box>

            {basics.avatar.visible && basics.avatar.value && (
              <Box
                sx={{ position: 'absolute', top: 16, right: 32, width: '3.5cm', height: '5.2cm' }}
              >
                <Image
                  layout="responsive"
                  objectFit="cover"
                  width={295}
                  height={413}
                  src={basics.avatar.value}
                />
              </Box>
            )} */}
      </Box>
    </Box>
  );
};

export default ResumeBasic;
