// Components
import ModuleTitleStyle1 from './Style1/ModuleTitle';

// Types
import type { ModuleBase, ResumeConfig } from '@/components/Resume/types';

type ComponentProps = {
  selectedItem?: boolean;
  config?: ResumeConfig;
  data: Partial<ModuleBase>;
};

export type ModuleTitles = 'style1';

const moduleTitles: Record<ModuleTitles, React.FC<ComponentProps>> = {
  style1: ModuleTitleStyle1,
};

export default moduleTitles;
