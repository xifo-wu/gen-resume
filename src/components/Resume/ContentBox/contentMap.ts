import EducationContent1 from './Education/Content1';
import EducationContent1Preview from './Education/Content1/preview';

export type ContentType = {
  id: string;
  preview: React.FC<any>;
  component: React.FC<any>;
};

export const educationMap: Record<string, ContentType> = {
  educationContent1: {
    id: 'educationContent1',
    preview: EducationContent1Preview,
    component: EducationContent1,
  },
};

export type EducationMapKeys = keyof typeof educationMap;
export type ContentMapKeys = EducationMapKeys;

const contentMap: Record<ContentMapKeys, ContentType> = {
  // 内容展示模块
  // 教育模块
  ...educationMap,
};

export default contentMap;
