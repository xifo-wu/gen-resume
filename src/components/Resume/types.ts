// 简历模版配置
export interface ResumeConfig {
  themeColor: string;
  themeBgTextColor: string;
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
export type BasicsData = {
  [key in BasicsDataKeys]: string;
};

// 简历
export interface ResumeType {
  resumeBasic: BasicsData;
  config: ResumeConfig;
  workExperience: any;
  education: any;
}
