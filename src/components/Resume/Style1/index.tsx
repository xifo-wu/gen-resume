import { Box, lighten, Link, Typography } from '@mui/material';
import _ from 'lodash';
import type { ResumeType } from '../types';
import contentMap from '@/components/Resume/ContentBox/contentMap';
import ResumeBasic from './ResumeBasic';

interface Style1Props {
  data: ResumeType;
}

// 名为样式 1 的简历模版
const Style1 = (props: Style1Props) => {
  const { data } = props;
  const { resumeBasic, config } = data;

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
      <ResumeBasic data={resumeBasic} config={config} />

      {/* <Box
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
      </Box> */}
    </Box>
  );
};

export default Style1;
