import EducationContent1 from './Education/Content1';
import EducationContent2 from './Education/Content2';
import WorkExperienceContent1 from './WorkExperience/Content1';
import WorkExperienceContent2 from './WorkExperience/Content2';
import EducationContent1Preview from './Education/Content1/preview';
import EducationContent2Preview from './Education/Content2/preview';
import WorkExperienceContent1Preview from './WorkExperience/Content1/preview';
import WorkExperienceContent2Preview from './WorkExperience/Content2/preview';

export type ContentType = {
  id: string;
  preview: React.FC<any>;
  component: React.FC<any>;
};

// #region 教育经历模块
export const educationMap: Record<string, ContentType> = {
  educationContent1: {
    id: 'educationContent1',
    preview: EducationContent1Preview,
    component: EducationContent1,
  },
  educationContent2: {
    id: 'educationContent2',
    preview: EducationContent2Preview,
    component: EducationContent2,
  },
};
// #endregion

// #region 工作经历模块
export const workExperienceMap: Record<string, ContentType> = {
  workExperience1: {
    id: 'workExperience1',
    preview: WorkExperienceContent1Preview,
    component: WorkExperienceContent1,
  },
  workExperience2: {
    id: 'workExperience2',
    preview: WorkExperienceContent2Preview,
    component: WorkExperienceContent2,
  }
}
// #endregion

export type EducationMapKeys = keyof typeof educationMap;
export type ContentMapKeys = EducationMapKeys;

const contentMap: Record<ContentMapKeys, ContentType> = {
  // 内容展示模块
  ...educationMap,
  ...workExperienceMap,
};

export default contentMap;
