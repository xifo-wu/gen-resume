import { Box, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import styles from './styles';
import NewResumeModalForm, { NewResumeFormData } from '../NewResumeModalForm';
import api, { apiPost } from '@/api';
import { toast } from 'react-toastify';
import { templateLayoutTypes } from '@/components/Resume/templateMap';
import { useSWRConfig } from 'swr';

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
  const { mutate } = useSWRConfig();

  const handleSubmit = async (payload: NewResumeFormData) => {
    const { data, error } = await apiPost({
      url: '/api/v1/resumes',
      data: {
        ...payload,
        layoutType: templateLayoutTypes[0],
      },
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    mutate('/api/v1/resumes');
    toast.success('创建成功');
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
