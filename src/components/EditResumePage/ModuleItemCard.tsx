import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import OpenWithIcon from '@mui/icons-material/OpenWith';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

// Hooks
import { useDragControls, useMotionValue } from 'framer-motion';
import { useRaisedShadow } from '@/hooks/useRaisedShadow';

// Components
import { Reorder } from 'framer-motion';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// Styles
import styles from './ModuleItemCardStyle';

// Types
import type { ModuleMapKeys } from '@/components/Resume/modules';

// Constant
import { moduleMap } from '@/components/Resume/modules';

interface ModuleItemCardProps {
  item: ModuleMapKeys;
  onEditClick: (item: ModuleMapKeys) => void;
}

const ModuleItemCard = (props: ModuleItemCardProps) => {
  const { item, onEditClick } = props;
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();
  const data = moduleMap[item];

  const handleEditClick = () => {
    onEditClick(item);
  }

  return (
    <Reorder.Item
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
      style={{ boxShadow, y }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.editBox} onClick={handleEditClick}>
          <EditOutlinedIcon sx={styles.editIcon} />
        </Box>
        <Box sx={styles.titleBox}>
          <Typography sx={styles.enTitle}>{data.en}</Typography>
          <Typography variant="h5" sx={styles.title}>
            {data.name}
          </Typography>
        </Box>
        <Box sx={styles.grabBox} onPointerDown={(e) => controls.start(e)}>
          <DragIndicatorIcon sx={styles.grabIcon} />
        </Box>
      </Box>
    </Reorder.Item>
  );
};

export default ModuleItemCard;
