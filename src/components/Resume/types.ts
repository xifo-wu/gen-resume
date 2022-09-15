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

// 个人信息
export type BasicsData = {
  [key in BasicsDataKeys]: {
    label: string;
    visible: boolean;
    value: string;
    isShowLabel: boolean;
  };
};

// 简历
export interface ResumeType {
  config: ResumeConfig;
  basics: BasicsData;
  workExperience: any;
  education: any;
}
