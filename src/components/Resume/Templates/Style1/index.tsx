import { Box, lighten, Link, Typography } from '@mui/material';
import _ from 'lodash';
import contentMap from '@/components/Resume/ContentBox/contentMap';
import ResumeBasic from './ResumeBasic';

// Types
import type { ModulesKey, ResumeType } from '@/components/Resume/types';
import type { ModuleTitles } from '@/components/Resume/Templates/moduleTitleMap';

// Constant
import moduleTitleMap from '@/components/Resume/Templates/moduleTitleMap';


interface Style1Props {
  data: ResumeType;
}

const buildModuleItems = (data: ResumeType, moduleOrder: string) => {
  const moduleOrderArray = (moduleOrder.split(',') as (ModulesKey | 'resumeBasic')[]) || [];
  const filteredModule = _.filter(moduleOrderArray, (item) => item !== 'resumeBasic');

  return _.map(filteredModule, (item) => data[item]) as ResumeType[ModulesKey][];
};

// 名为样式 1 的简历模版
const Style1 = (props: Style1Props) => {
  const { data } = props;
  const { resumeBasic, config, moduleOrder } = data;
  const moduleItems = buildModuleItems(data, moduleOrder);

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

      <Box sx={{ mt: 4 }}>
        {_.map(moduleItems, (item) => {
          const ModuleTitle = moduleTitleMap[item.moduleTitleType as ModuleTitles]
          return (
            <Box
              key={item.id}
              sx={{
                display: item.visible ? 'block' : 'none',
                my: 1,
              }}
            >
              <ModuleTitle data={item} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Style1;
