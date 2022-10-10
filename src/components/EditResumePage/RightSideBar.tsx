import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import { Reorder } from 'framer-motion';
import _ from 'lodash';
import Typography from '@mui/material/Typography';
import ModuleItemCard from './ModuleItemCard';

const drawerWidth = 256;

interface Props {
  window?: () => Window;
  // TODO 类型具体到是什么模块
  modules: string[];
}

const modulesItems = [
  {
    id: 'resumeBasic',
    name: '基本信息',
    en: 'Basic Info',
  },
  {
    id: 'workExperience',
    name: '工作经历',
    en: 'Work Experience',
  },
  {
    id: 'education',
    name: '教育经历',
    en: 'Education',
  },
  {
    id: 'projects',
    name: '项目经历',
    en: 'Projects',
  },
];

// 右侧菜单
// 用于选择模版、添加模块等
const RightSideBar = (props: Props) => {
  const { window, modules } = props;
  const [items, setItems] = React.useState(() => {
    return _.filter(modulesItems, (item) => _.indexOf(modules, item.id) > -1);
  });

  const container = window !== undefined ? () => window().document.body : undefined;

  console.log(items, 'items');

  const drawer = (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        {_.map(items, (item) => (
          <Grid key={item.id} xs={12} item>
            <Box>
              <ModuleItemCard data={item} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
  return (
    <Box>
      <Drawer
        anchor="right"
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderLeft: 'none' },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default RightSideBar;
