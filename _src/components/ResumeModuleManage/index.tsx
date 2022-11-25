import React from 'react';
import { useEffect } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import styles from './styles';
import _ from 'lodash';
import ModuleItemCard from '../EditResumePage/ModuleItemCard';
import { useSWRConfig } from 'swr';
import { apiPut } from '@/api';
import { useRouter } from 'next/router';
import { useDebounce } from 'react-use';
import { toast } from 'react-toastify';
import type { ModuleMapKeys } from '@/components/Resume/modules';
import { Reorder } from 'framer-motion';
import moduleManageTabState from '@/stateManagement/atom/moduleManageTabState';
import { useRecoilState } from 'recoil';
import EditResumeBasic from './EditResumeBasic';

export interface Props {
  onChange?: (tabName: string) => void;
  currentTab: string;
  data: any;
}

const ResumeModuleManage = (props: Props) => {
  const { onChange, data, currentTab } = props;
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { query } = router;
  const [reordered, setReordered] = React.useState(data.moduleOrder);
  const [debouncedReordered, setDebouncedReordered] = React.useState('');

  const [moduleManageTab, setModuleManageTab] = useRecoilState(moduleManageTabState);

  useEffect(() => {
    setReordered(data.moduleOrder);
  }, [data.moduleOrder]);

  useDebounce(
    () => {
      if (debouncedReordered) {
        mutate(
          `/api/v1/resumes/${query.slug}`,
          async (mutateData: any) => {
            const { data, error } = await apiPut<any, any>({
              url: `/api/v1/resumes/${query.slug}`,
              data: {
                moduleOrder: reordered,
              },
            });

            if (error) {
              toast.error(error.message);
              return mutateData;
            }

            return {
              ...mutateData,
              data,
            };
          },
          {
            // API 已经给我们提供了更新的信息，
            // 所以我们不需要在这里重新请求。
            revalidate: false,
          },
        );
      }

      setDebouncedReordered(reordered);
    },
    1000,
    [reordered],
  );

  if (!_.includes(['moduleManage'], currentTab)) {
    return null;
  }

  const handleActionClick = (item: ModuleMapKeys | 'addResumeModule') => {
    if (item === 'addResumeModule') {
      setModuleManageTab('addResumeModule');
    }

    if (item === 'resumeBasic') {
      setModuleManageTab('editResumeBasic');
    }
    console.log(item);
  };

  const handleReorder = (newItems: string[]) => {
    setReordered(newItems.join(','));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        position: 'relative',
        overflowY: 'auto',
      }}
    >
      <Box sx={styles.menuContainer}>
        <Box
          sx={{
            fontSize: '0.875rem',
            color: 'rgb(255 255 255 / 78%)',
            pt: 2,
            pl: 2,
          }}
        >
          操作
        </Box>
        <Box sx={{ pt: 2 }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleActionClick('addResumeModule')}>
                <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                  <CategoryIcon sx={{ color: '#fff', fontSize: '1.375rem' }} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    my: 0,
                    '& .MuiListItemText-primary': {
                      fontSize: '0.965rem',
                      lineHeight: 1,
                      fontWeight: 500,
                    },
                  }}
                  primary="添加模块"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Box
          sx={{
            fontSize: '0.875rem',
            color: 'rgb(255 255 255 / 78%)',
            pt: 2,
            pl: 2,
          }}
        >
          模块
        </Box>
        <Box sx={styles.modulesBox}>
          <Box sx={{ mb: 2 }}>
            <ModuleItemCard disableReorder onEditClick={handleActionClick} item="resumeBasic" />
          </Box>

          <Reorder.Group axis="y" onReorder={handleReorder} values={reordered.split(',')}>
            {_.map(
              reordered.split(',').filter((i: string) => i !== 'resumeBasic'),
              (item: ModuleMapKeys) => (
                <ModuleItemCard onEditClick={handleActionClick} key={item} item={item} />
              ),
            )}
          </Reorder.Group>
        </Box>
      </Box>

      <Box sx={{ p: 2, color: '#fff' }}>
        {moduleManageTab === 'addResumeModule' && <Box>xxxxxhxhx</Box>}
        {moduleManageTab === 'editResumeBasic' && <EditResumeBasic data={data} />}
      </Box>
    </Box>
  );
};

export default ResumeModuleManage;
