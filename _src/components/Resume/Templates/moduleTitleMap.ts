// Components
import ModuleTitleStyle1 from './Style1/ModuleTitle';
import ModuleTitleStyle2 from './Style2/ModuleTitle';

// Types
import type { ModuleBase, ResumeConfig } from '@/components/Resume/types';

type ComponentProps = {
  selectedItem?: boolean;
  config?: ResumeConfig;
  data: Partial<ModuleBase>;
};

export type ModuleTitles = 'style1' | 'style2';

const moduleTitles: Record<ModuleTitles, React.FC<ComponentProps>> = {
  style1: ModuleTitleStyle1,
  style2: ModuleTitleStyle2,
};

export default moduleTitles;
