import _ from 'lodash';
import Style1 from './Templates/Style1';
import Style2 from './Templates/Style2';
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
      'https://s1.ax1x.com/2022/10/21/x6Wl7V.jpg',
    component: Style1,
  },
  style2: {
    id: 'style2',
    preview:
      'https://s1.ax1x.com/2022/10/22/xcyYx1.jpg',
    component: Style2,
  },
};

export const templateLayoutTypes = _.map(templateMap, (item) => item.id)

export default templateMap;
