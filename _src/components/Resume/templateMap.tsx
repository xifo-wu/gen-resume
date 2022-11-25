import _ from 'lodash';
import Style1 from './Templates/Style1';
import Style2 from './Templates/Style2';
import type { ResumeType } from './types';

type ComponentProps = {
  data: ResumeType;
};

export type ResumeTemplateComponentProps = {
  data: ResumeType;
  onActionClick?: (id: number, actionName: string) => void;
};

export type TemplateType = {
  id: string;
  preview: string;
  component: React.FC<ComponentProps>;
};

export type ResumeTemplate = {
  key: string;
  cover: string;
  name: string;
  desc?: string;
  themeColor: string;
  component: React.FC<ResumeTemplateComponentProps>;
};

export const resumeTemplateMap: Record<string, ResumeTemplate> = {
  style1: {
    key: 'style1',
    cover: 'https://s1.ax1x.com/2022/10/21/x6Wl7V.jpg',
    name: '通用简历模版 (1)',
    themeColor: '#2065d1',
    component: Style1,
  },
  style2: {
    key: 'style2',
    cover: 'https://s1.ax1x.com/2022/10/22/xcyYx1.jpg',
    name: '通用简历模版 (2)',
    themeColor: '#9A1E36',
    component: Style2,
  },
};

export const resumeTemplateList: ResumeTemplate[] = _.map(resumeTemplateMap, (item) => item);

// 导出简历数量
export const resumeTemplateCount = resumeTemplateList.length;


export default resumeTemplateMap;
