export const moduleMap = {
  resumeBasic: {
    id: 'resumeBasic',
    name: '基本信息',
    en: 'Basic Info',
  },
  workExperiences: {
    id: 'workExperiences',
    name: '工作经历',
    en: 'Work Experiences',
  },
  educations: {
    id: 'educations',
    name: '教育经历',
    en: 'Educations',
  },
  projects: {
    id: 'projects',
    name: '项目经历',
    en: 'Projects',
  },
  skills: {
    id: 'skills',
    name: '专业技能',
    en: 'Professional Skills',
  },
  certificates: {
    id: 'certificates',
    name: '技能证书',
    en: 'Skill Certificates',
  },
};

export type ModuleMapKeys = keyof typeof moduleMap

const modules = [
  moduleMap.resumeBasic,
  moduleMap.workExperiences,
  moduleMap.educations,
  moduleMap.projects,
  moduleMap.skills,
  moduleMap.certificates,
];

export default modules;
