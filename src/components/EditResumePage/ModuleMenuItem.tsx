import { TbListDetails } from 'react-icons/tb';
import { Reorder, useDragControls, useMotionValue } from 'framer-motion';

import { moduleMap } from '@/components/Resumes/modules';
import { useRaisedShadow } from '@/hooks/useRaisedShadow';
import type { ModuleMapKeys } from '@/components/Resumes/modules';

interface Props {
  item: ModuleMapKeys;
  disableReorder?: boolean;
  onEditClick: (item: ModuleMapKeys) => void;
}

const ModuleMenuItem = ({ item, onEditClick, disableReorder }: Props) => {
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();
  const module = moduleMap[item];

  return (
    <Reorder.Item
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
      style={{ boxShadow, y }}
    >
      <div className="flex items-center py-[10px] px-[15px] mb-2 text-slate-500 hover:text-slate-700 hover:bg-slate-200 select-none">
        <TbListDetails onPointerDown={(e) => controls.start(e)} className="cursor-grab" size={18} />
        <div className="flex-1 leading-none text-[15px] ml-1 font-medium cursor-pointer">
          {module.name}
        </div>
      </div>
    </Reorder.Item>
  );
};

export default ModuleMenuItem;
