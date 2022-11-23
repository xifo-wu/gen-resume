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
  disableReorder?: boolean;
  onEditClick: (item: ModuleMapKeys) => void;
}

const ModuleItemCard = (props: ModuleItemCardProps) => {
  const { item, onEditClick, disableReorder } = props;
  const y = useMotionValue(0);
  const boxShadow = useRaisedShadow(y);
  const controls = useDragControls();
  const data = moduleMap[item];

  const handleEditClick = () => {
    onEditClick(item);
  };

  const Card = () => (
    <Box sx={styles.container}>
      {disableReorder ? (
        <Box sx={styles.editBox} onClick={handleEditClick}>
          <EditOutlinedIcon sx={styles.editIcon} />
        </Box>
      ) : (
        <Box sx={styles.grabBox} onPointerDown={(e) => controls.start(e)}>
          <DragIndicatorIcon sx={styles.grabIcon} />
        </Box>
      )}
      <Box sx={styles.titleBox} onClick={handleEditClick}>
        <Typography sx={styles.enTitle}>{data.en}</Typography>
        <Typography variant="h5" sx={styles.title}>
          {data.name}
        </Typography>
      </Box>
    </Box>
  );

  if (disableReorder) {
    return <Card />;
  }

  return (
    <Reorder.Item
      value={item}
      id={item}
      dragListener={false}
      dragControls={controls}
      style={{ boxShadow, y }}
    >
      <Card />
    </Reorder.Item>
  );
};

export default ModuleItemCard;
