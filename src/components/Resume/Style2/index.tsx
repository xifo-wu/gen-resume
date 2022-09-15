import { Box, Link, Typography } from '@mui/material';
import Image from 'next/image';
import _ from 'lodash';
import type { ResumeType } from '../types';

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

  console.log(moduleItems, 'moduleItems');

  return (
    <Box
      sx={{
        position: 'relative',
        p: 2,
        '@media print': {
          '&:hover': {
            border: 'none',
          },
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: 0,
          width: '50mm',
          height: '60mm',
          background: config.themeColor,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          left: '21mm',
          width: '60mm',
          height: '60mm',
          borderRadius: '50%',
          background: config.themeColor,
          border: `4mm solid ${config.themeColor}`,
        }}
      >
        {basics.avatar.visible && basics.avatar.value && (
          <Image
            layout="responsive"
            objectFit="cover"
            width="44mm"
            height="44mm"
            src={basics.avatar.value}
            style={{ borderRadius: '50%' }}
          />
        )}
      </Box>

      <Box
        sx={{
          marginLeft: '84mm',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: config.themeColor,
            display: 'block',
            fontSize: 38,
            fontWeight: 600,
            mr: 2,
            pb: 2,
          }}
        >
          {basics.name.visible && basics.name.value}
        </Typography>
        <Box>{basics.job.visible && <Typography>求职目标： {basics.job.value}</Typography>}</Box>
      </Box>
      <Box
        sx={{
          mt: 2,
          border: '0.125rem solid rgb(156, 156, 156)',
          minHeight: '297mm',
        }}
      >
        <Box
          sx={{
            pt: 2,
            marginLeft: '84mm',
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

        <Box
          sx={{
            mt: 4,
            p: 2,
          }}
        >
          {moduleItems.map((item) => (
            // @ts-ignore TODO 改成ID
            <Box
              sx={{
                my: 1,
              }}
              key={item.sortIndex}
            >
              <Box
                sx={{
                  borderBottom: '2px solid rgba(156, 156, 156, 0.45)',
                  pb: 1,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: config.themeColor,
                  }}
                >
                  {item?.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Style1;
