import type { ResumeType } from '@/components/Resume/types';
import _ from 'lodash';

type ComponentProps = {
  data: ResumeType;
};

type ResumeTemplate = {
  key: string;
  cover: string;
  name: string;
  desc?: string;
  themeColor: string;
  component?: React.FC<ComponentProps>;
};

export const resumeTemplateMap: Record<string, ResumeTemplate> = {
  style1: {
    key: 'style1',
    cover: 'https://s1.ax1x.com/2022/10/21/x6Wl7V.jpg',
    name: '通用简历模版 (1)',
    themeColor: '#2065d1',
  },
  style2: {
    key: 'style2',
    cover: 'https://s1.ax1x.com/2022/10/22/xcyYx1.jpg',
    name: '通用简历模版 (2)',
    themeColor: '#9A1E36',
  },
};

const resumeTemplateList: ResumeTemplate[] = _.map(resumeTemplateMap, (item) => item);

// 导出简历数量
export const resumeTemplateCount = resumeTemplateList.length;

// 默认导出简历模版列表
export default resumeTemplateList;
