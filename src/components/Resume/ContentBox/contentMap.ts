import EducationContent1 from './Education/Content1';


export type ContentType = {
  id: string;
  preview: string;
  component: React.FC<any>;
};

const contentMap: Record<string, ContentType> = {
  // 内容展示模块
  // 教育模块
  educationContent1: {
    id: 'educationContent1',
    preview:
      'https://images.unsplash.com/photo-1661870467713-1047a3e1f283?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    component: EducationContent1,
  }
};

export default contentMap;
