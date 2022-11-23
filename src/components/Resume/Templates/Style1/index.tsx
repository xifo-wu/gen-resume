import type { ResumeType } from '@/components/Resume/types';
import type { ModuleTitles } from '@/components/Resume/Templates/moduleTitleMap';
import { Box } from '@mui/material';
import _ from 'lodash';
import ResumeBasic from './ResumeBasic';
import ModuleToolbar from '../../components/ModuleToolbar';
import contentMap from '@/components/Resume/ContentBox/contentMap';
import moduleTitleMap from '@/components/Resume/Templates/moduleTitleMap';
import { ResumeTemplateComponentProps, resumeTemplateMap } from '@/components/Resume/templateMap';
import helpers from '../../helpers';
import { useSetRecoilState } from 'recoil';
import moduleManageTabState, {
  ResumeManageTabKeys,
} from '@/stateManagement/atom/moduleManageTabState';

// 名为样式 1 的简历模版
const Style1 = (props: ResumeTemplateComponentProps) => {
  const { data, onActionClick } = props;
  const { resumeBasic, moduleOrder } = data;
  // const
  const setModuleManageTabState = useSetRecoilState(moduleManageTabState);

  const themeColor = data.themeColor || resumeTemplateMap[data.layoutType]?.themeColor;
  const moduleItems = helpers.buildModuleItems(data, moduleOrder);

  const handleToolClick = (actionName: string, moduleName: string) => {
    const moduleTabName = `${actionName}${moduleName.replace(/^\S/, (s) =>
      s.toUpperCase(),
    )}` as ResumeManageTabKeys;

    setModuleManageTabState(moduleTabName);

    console.log('actionName', actionName);
    // onActionClick?.(data.id, actionName);
  };

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
        <ModuleToolbar
          editOnly
          onToolClick={(actionName) => handleToolClick(actionName, 'resumeBasic')}
        >
          <ResumeBasic themeColor={themeColor} data={resumeBasic} />
        </ModuleToolbar>

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
              <ModuleToolbar key={`${item.contentType}-${item.id}`} onToolClick={(actionName) => handleToolClick(actionName, item.key || '')}>
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
              </ModuleToolbar>
            );
          })}
        </Box>
      </Box>

      <Box sx={{ flex: '0 0 32px', width: '100%', background: themeColor }} />
    </Box>
  );
};

export default Style1;
