import Style1 from './Style1';
import Style2 from './Style2';
import type { ResumeType } from './types';

type ComponentProps = {
  data: ResumeType;
};

export type TemplateType = {
  id: string;
  preview: string;
  component: React.FC<ComponentProps>;
};

const templateMap: Record<string, TemplateType> = {
  style1: {
    id: 'style1',
    preview:
      'https://images.unsplash.com/photo-1661899068878-f1dcd63c56e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    component: Style1,
  },
  style2: {
    id: 'style2',
    preview:
      'https://images.unsplash.com/photo-1661870467713-1047a3e1f283?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDE0fGJvOGpRS1RhRTBZfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
    component: Style2,
  },
};

export default templateMap;
