import React, { useState } from 'react';
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
import LoadingButton from '@mui/lab/LoadingButton';

export interface NewResumeModalFormProps {
  children?: React.ReactElement;
  onSubmit: (data: NewResumeFormData) => Promise<boolean>;
}

export interface NewResumeFormData {
  name: string;
  slug: string;
}

export default function NewResumeModalForm(props: NewResumeModalFormProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    handleSubmit,
    reset,
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
      Open
    </Button>
  );

  const triggerOnClick = async (e: any) => {
    setOpen(true);
    trigger.props?.onClick?.(e);
  };

  const onSubmit = async (data: NewResumeFormData) => {
    setSubmitting(true);
    const result = await props.onSubmit(data);
    setSubmitting(false);
    if (result) {
      reset();
      setOpen(false);
    }
  };

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
        <DialogTitle id="responsive-dialog-title">????????????</DialogTitle>
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
              ??????????????????????????????????????????????????????????????????
            </DialogContentText>

            <Controller
              name="name"
              control={control}
              rules={{
                required: '??????????????????',
              }}
              render={({ field }) => (
                <TextField
                  label="??????"
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
                required: '??????????????????',
                pattern: {
                  value: /^[A-Za-z0-9-]+$/,
                  message: '??????????????????????????????????????? "-" ??????',
                },
              }}
              render={({ field }) => (
                <TextField
                  label="??????"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  error={!!errors.slug}
                  helperText={errors.slug?.message || '?????????????????????????????????'}
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button variant="text" onClick={handleClose}>
              ??????
            </Button>
            <LoadingButton loading={submitting} variant="contained" type="submit" autoFocus>
              ??????
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
