import { Box, lighten, Link, Typography } from '@mui/material';
import Image from 'next/image';
import _ from 'lodash';
import type { ResumeType } from '../types';
import contentMap from '@/components/Resume/ContentBox/contentMap';

interface Style1Props {
  data: ResumeType;
}

// 名为样式 1 的简历模版
const Style1 = (props: Style1Props) => {
  const { data } = props;
  const { basics, config } = data;

  const infoItems = _.pick(basics, [
    'mobile',
    'email',
    'educationalQualifications',
    'website',
    'birthday',
    'age',
  ]);

  // @to-ignore
  const moduleItems = _.chain(data)
    .pick(['workExperience', 'education'])
    .sortBy((i) => i.sortIndex)
    .value();

  return (
    <Box
      sx={{
        position: 'relative',
        '@media print': {
          '&:hover': {
            border: 'none',
          },
        },
      }}
    >
      {basics && (
        <>
          <Box>
            <Box
              className="header-box"
              sx={{
                background: config.themeColor,
                color: config.themeBgTextColor,
                pt: 6,
                px: 4,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                <Typography
                  variant="h1"
                  sx={{ display: 'block', fontSize: 38, fontWeight: 600, mr: 2, pb: 2 }}
                >
                  {basics.name.visible && basics.name.value}
                </Typography>
                {basics.job.visible && <Typography>求职目标： {basics.job.value}</Typography>}
              </Box>
            </Box>

            {/* 信息内容的宽度应该是 100% - 左右两边 Padding - 照片宽 - 右 Padding (让文字和照片有间距) */}
            <Box
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
            )}
          </Box>
        </>
      )}

      <Box
        sx={{
          mt: 2,
        }}
      >
        {moduleItems.map((item) => {
          const ContentComponent = contentMap[item.contentType].component;
          return (
            // @ts-ignore TODO 改成ID
            <Box
              sx={{
                display: item.visible ? 'block' : 'none',
                my: 1,
              }}
              key={item.id}
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
                      color: config.themeColor,
                    }}
                  >
                    {item?.label}
                    {console.log(item)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mx: 4, mt: 1.5 }}>
                {
                  _.map(item.items, (li) => {
                    return (
                      <ContentComponent key={li.id} data={li} />
                    )
                  })
                }
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Style1;
