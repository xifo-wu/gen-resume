// 个人信息键值对配置
export interface ResumeBasicField {
  id: string | number;
  value: string;
  visible?: boolean;
  showLabel?: boolean;
  label?: string;
  icon?: string;
}

// 个人信息的 Key
export type BasicsDataKeys =
  | 'name'
  | 'job'
  | 'mobile'
  | 'email'
  | 'educationalQualifications'
  | 'website'
  | 'birthday'
  | 'age'
  | 'avatar';

// 个人信息基础信息
export type BasicsData = Record<BasicsDataKeys, ResumeBasicField>;

// 简历
export interface ResumeType {
  id: number;
  name: string;
  slug: string;
  themeColor: string;
  layoutType: string;
  moduleOrder: string;
  resumeBasic: BasicsData;
  education: Education;
  workExperience: WorkExperience;
  others: Other[];
  project: Project;
}

export type ModulesKey = 'education' | 'workExperience' | 'project' | 'others';

export interface ModuleBase {
  id: string | number;
  key?: string;
  visible: boolean;
  label: string;
  moduleTitleType: string;
  contentType: string;
  config: string;
  removeIds?: (string | number)[];
}

// 模块配置类型
export interface ModuleConfig {
  showDivider: boolean; // 是否展示分割线
}

// #region 教育经历类型
export interface EducationDetail {
  id?: number;
  name?: string;
  endOn: string | null;
  startOn: string | null;
  desc?: string;
  universityMajors?: string;
  sortIndex: number;
}
export interface Education extends ModuleBase {
  educationDetails: EducationDetail[];
}
// #endregion

// #region 工作经历类型
export interface WorkExperienceDetail {
  id?: number;
  name?: string;
  endOn: string | null;
  startOn: string | null;
  desc?: string;
  sortIndex: number;
  jobTitle?: string;
}
export interface WorkExperience extends ModuleBase {
  workExperienceDetails: WorkExperienceDetail[];
}
// #endregion

// #region 项目经历类型
export interface ProjectDetail {
  desc?: string;
  endOn: string | null;
  startOn: string | null;
  id?: number;
  name?: string;
  role?: string;
  sortIndex: number;
}

export interface Project extends ModuleBase {
  projectDetails: ProjectDetail[];
}
// #endregion

// #region 其他自定义模块
export interface Other extends ModuleBase {
  desc?: string;
  sortIndex: number;
}
// #endregion
