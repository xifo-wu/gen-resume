import AppsIcon from '@mui/icons-material/Apps';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

const resume = {
  id: 'resume',
  title: 'Resume',
  caption: '完善简历',
  type: 'group',
  children: [
    {
      id: 'resumeTemplates',
      title: '选择模版',
      type: 'item',
      callModal: true,
      icon: AppsIcon,
    },
    {
      id: 'resumeModules',
      title: '添加模块',
      type: 'item',
      callModal: true,
      icon: ListAltIcon,
    },
    {
      id: 'resumeConfig',
      title: '模版配置',
      type: 'item',
      disabled: true,
      callModal: true,
      icon: DisplaySettingsIcon,
    },
  ],
};

export default resume;
