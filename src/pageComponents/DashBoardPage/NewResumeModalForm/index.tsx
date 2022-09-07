import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';

export interface NewResumeModalFormProps {
  children?: React.ReactElement;
}

export interface NewResumeFormData {
  name: string;
  slug: string;
}

export default function NewResumeModalForm(props: NewResumeModalFormProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NewResumeFormData>({
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const trigger = children || (
    <Button variant="outlined" onClick={handleClickOpen}>
      Open responsive dialog
    </Button>
  );

  const triggerOnClick = async (e: any) => {
    setOpen(true);
    trigger.props?.onClick?.(e);
  };

  const onSubmit = (data: NewResumeFormData) => console.log(data);

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: triggerOnClick,
        })}
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">新建简历</DialogTitle>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { my: 2 },
          }}
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <DialogContent>
            <DialogContentText sx={{ fontSize: '0.875rem', mb: 2 }}>
              就差一步了，填写以下信息创建一个全新的简历吧
            </DialogContentText>

            <Controller
              name="name"
              control={control}
              rules={{
                required: '名称不能为空',
              }}
              render={({ field }) => (
                <TextField
                  label="名称"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />
            <Controller
              name="slug"
              control={control}
              rules={{
                required: '标识不能为空',
                pattern: {
                  value: /^[A-Za-z0-9]+$/,
                  message: '标识只能是英文和数字组成',
                },
              }}
              render={({ field }) => (
                <TextField
                  label="标识"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  error={!!errors.slug}
                  helperText={errors.slug?.message || '将成为简历链接的一部分'}
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button variant="text" onClick={handleClose}>
              取消
            </Button>
            <Button variant="contained" type="submit" autoFocus>
              创建
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
