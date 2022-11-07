import { Box, lighten, Link, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import ResumeBasic from './ResumeBasic';

// Types
import type { ModulesKey, ResumeType } from '@/components/Resume/types';
import type { ModuleTitles } from '@/components/Resume/Templates/moduleTitleMap';

// Constant
import contentMap from '@/components/Resume/ContentBox/contentMap';
import moduleTitleMap from '@/components/Resume/Templates/moduleTitleMap';

interface Style1Props {
  data: ResumeType;
}

const buildModuleItems = (data: ResumeType, moduleOrder: string) => {
  const moduleOrderArray = (moduleOrder.split(',') as (ModulesKey | 'resumeBasic')[]) || [];
  const filteredModule = _.filter(moduleOrderArray, (item) => item !== 'resumeBasic');

  return _.map(filteredModule, (item) => data[item]).filter(
    (item) => !!item,
  ) as ResumeType[ModulesKey][];
};

// 名为样式 1 的简历模版
const Style1 = (props: Style1Props) => {
  const { data } = props;
  // TODO 使用模版里的默认演示
  const themeColor = data.themeColor || 'rgb(32, 101, 209)';
  const { resumeBasic, config, moduleOrder } = data;
  const theme = useTheme();
  const moduleItems = buildModuleItems(data, moduleOrder);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '@media print': {
          '&:hover': {
            border: 'none',
          },
        },
      }}
    >
      <Box sx={{ flex: 1 }}>
        <ResumeBasic themeColor={themeColor} data={resumeBasic} config={config} />

        <Box sx={{ mt: 4 }}>
          {_.map(moduleItems, (item, key) => {
            // item 可能为数据情况，例如其他。
            if (Array.isArray(item)) {
              return _.sortBy(item, ['sortIndex']).map((itemDetail) => {
                const ModuleTitle = moduleTitleMap[itemDetail.moduleTitleType as ModuleTitles];
                const ContentComponent = contentMap[itemDetail.contentType].component;

                return (
                  <Box
                    key={`${itemDetail.contentType}-${itemDetail.id}`}
                    sx={{
                      display: itemDetail.visible ? 'block' : 'none',
                      my: 1,
                    }}
                  >
                    <ModuleTitle data={itemDetail} />
                    <Box sx={{ px: 3, my: 2 }}>
                      <ContentComponent data={itemDetail} />
                    </Box>
                  </Box>
                );
              });
            }

            const ModuleTitle = moduleTitleMap[item.moduleTitleType as ModuleTitles];
            const ContentComponent = contentMap[item.contentType].component;

            return (
              <Box
                key={`${item.contentType}-${item.id}`}
                sx={{
                  display: item.visible ? 'block' : 'none',
                  my: 1,
                }}
              >
                <ModuleTitle data={item} />
                <Box sx={{ px: 3, my: 2 }}>
                  <ContentComponent data={item} />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ flex: '0 0 32px', width: '100%', background: themeColor }} />
    </Box>
  );
};

export default Style1;
