import _ from 'lodash';
import { Box, Paper } from '@mui/material';
import type { ModulesKey, ResumeType } from '@/components/Resume/types';
import ResumeBasic from './ResumeBasic';
import ColorSatin from './Common/ColorSatin';
import styles from './indexStyles';

import type { ModuleTitles } from '@/components/Resume/Templates/moduleTitleMap';

// Constant
import contentMap from '@/components/Resume/ContentBox/contentMap';
import moduleTitleMap from '@/components/Resume/Templates/moduleTitleMap';


interface Props {
  data: ResumeType;
}


const buildModuleItems = (data: ResumeType, moduleOrder: string) => {
  const moduleOrderArray = (moduleOrder.split(',') as (ModulesKey | 'resumeBasic')[]) || [];
  const filteredModule = _.filter(moduleOrderArray, (item) => item !== 'resumeBasic');

  return _.map(filteredModule, (item) => data[item]).filter(
    (item) => !!item,
  ) as ResumeType[ModulesKey][];
};

const Style2 = (props: Props) => {
  const { data } = props;
  const { resumeBasic, config, moduleOrder } = data;

  const moduleItems = buildModuleItems(data, moduleOrder);

  // TODO 颜色可配置
  const primaryColor = '#9A1E36';

  return (
    <Paper elevation={0} sx={styles.container}>
      <ColorSatin color={primaryColor} />
      <Box sx={{ flex: 1 }}>
        <ResumeBasic data={resumeBasic} config={config} />

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
      <ColorSatin direction="right" color={primaryColor} />
    </Paper>
  );
};

export default Style2;
