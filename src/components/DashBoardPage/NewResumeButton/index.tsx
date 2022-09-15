import { Box, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles';
import NewResumeModalForm, { NewResumeFormData } from '../NewResumeModalForm';
import api from '@/api';
import { toast } from 'react-toastify';

interface Result {
  success: true;
  message: string;
}

const NewResumeButtonBase = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 372,
  width: 264,
  borderRadius: '1rem',
  background: '#fff',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 232,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const NewResumeButton = () => {
  const handleSubmit = async (data: NewResumeFormData) => {
    const { data: res } = await api<NewResumeFormData, Result>({
      url: '/api/v1/resumes',
      method: 'POST',
      data,
    });

    if (!res.success) {
      toast.error(res.message);
      return false;
    }

    toast.success(res.message);
    return true;
  };

  return (
    <Box>
      <NewResumeModalForm onSubmit={handleSubmit}>
        <NewResumeButtonBase>
          <AddIcon sx={styles.addIconSX} />
        </NewResumeButtonBase>
      </NewResumeModalForm>

      <Box sx={{ ml: 1, mt: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: '.875rem',
            fontWeight: '600',
            lineHeight: 1.625,
            color: '#333',
          }}
        >
          新建简历
        </Typography>
        <Typography
          sx={{
            fontSize: '.625rem',
            color: 'rgb(103, 116, 142)',
            fontWeight: '400',
            lineHeight: 1.625,
          }}
        >
          从默认模版中新建
        </Typography>
      </Box>
    </Box>
  );
};

export default NewResumeButton;
