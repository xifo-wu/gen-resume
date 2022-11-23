import type { ReactNode } from 'react';
import { Box, IconButton } from '@mui/material';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import styles from './styles';

interface Props {
  editOnly?: boolean;
  onToolClick: (actionName: string) => void;
  children: ReactNode;
}

const ModuleToolbar = (props: Props) => {
  const { editOnly = false, onToolClick, children } = props;

  if (editOnly) {
    return (
      <Box sx={styles.wrap}>
        <Box className="toolbar" sx={styles.toolbar}>
          <IconButton onClick={() => onToolClick('edit')} size="large" sx={{ color: '#fff' }}>
            <DriveFileRenameOutlineRoundedIcon fontSize="inherit" />
          </IconButton>
        </Box>
        {children}
      </Box>
    );
  }

  return (
    <Box sx={styles.wrap}>
      <Box className="toolbar" sx={styles.toolbar}>
        <IconButton onClick={() => onToolClick('edit')} size="large" sx={{ color: '#fff' }}>
          <DriveFileRenameOutlineRoundedIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" sx={{ color: '#fff' }}>
          <AddRoundedIcon fontSize="inherit" />
        </IconButton>

        <IconButton size="large" sx={{ color: '#fff' }}>
          <GetAppRoundedIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" sx={{ color: '#fff' }}>
          <PublishRoundedIcon fontSize="inherit" />
        </IconButton>
        <IconButton size="large" sx={{ color: '#fff' }}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Box>
      {children}
    </Box>
  );
};

export default ModuleToolbar;
