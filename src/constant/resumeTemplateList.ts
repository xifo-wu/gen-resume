type ResumeTemplate = {
  key: string;
  cover: string;
  name: string;
  desc?: string;
};

const resumeTemplateList: ResumeTemplate[] = [
  {
    key: 'style1',
    cover: 'https://s1.ax1x.com/2022/10/21/x6Wl7V.jpg',
    name: "通用简历模版 (1)",
  },
  {
    key: 'style2',
    cover: 'https://s1.ax1x.com/2022/10/22/xcyYx1.jpg',
    name: "通用简历模版 (2)",
  },
];

// 导出简历数量
export const resumeTemplateCount = resumeTemplateList.length;

// 默认导出简历模版列表
export default resumeTemplateList;
