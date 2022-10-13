// 简历模版配置
export interface ResumeConfig {
  themeColor: string;
  themeBgTextColor: string;
}

// 键值对配置
export interface KVConfig {
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

export type BasicsDataKeysConfig = `${BasicsDataKeys}Config`;

// 个人信息基础信息
export type BasicsData = {
  [key in BasicsDataKeys | BasicsDataKeysConfig]: string;
};

// 简历
export interface ResumeType {
  name: string;
  slug: string;
  layoutType: string;
  moduleOrder: string;
  resumeBasic: BasicsData;
  education: Education;
  config: ResumeConfig;
  workExperience: WorkExperience;
}

export type ModulesKey = 'education' | 'workExperience';

export interface ModuleBase {
  id: string | number;
  visible: boolean;
  label: string;
  moduleTitleType: string;
}

export interface Education extends ModuleBase {}

export interface WorkExperience extends ModuleBase {}
