import React, { useState } from 'react';
import dayjs from 'dayjs';

import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Controller, useForm } from 'react-hook-form';
import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// Components
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputField from '@/components/Form/InputField';
import KVConfigField from './KVConfigField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Hooks
import { useControlled } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Constant
import { emailRegex } from '@/enums/const';
import { watch } from 'fs';

// Types
export interface ResumeBasicModalFormProps {
  children?: React.ReactElement;
  ignoreTrigger?: boolean;
  open?: boolean;
  initData?: any;
  onSubmit: (data: ResumeBasicData) => Promise<boolean>;
  onChange?: (open: boolean) => void;
}

export interface ResumeBasicData {
  name: string;
  nameConfig: string;
  email: string;
  emailConfig: string;
  job: string;
  jobConfig: string;
  mobile: string;
  mobileConfig: string;
  educationalQualifications: string;
  educationalQualificationsConfig: string;
  website: string;
  websiteConfig: string;
  birthday: string;
  birthdayConfig: string;
  age: number;
  ageConfig: string;
  avatar: string;
  avatarConfig: string;
}

const isDate = (value: any) => {
  if (!value) {
    return true;
  }

  let needValid = value;
  if (typeof needValid === 'string') {
    needValid = dayjs(needValid);
  }

  if (needValid.isValid()) {
    return true;
  }

  return '时间存在错误有误';
};

export default function ResumeBasicModalForm(props: ResumeBasicModalFormProps) {
  const { initData, children, open: openProps, ignoreTrigger = false, onChange } = props;
  const [open, setOpen] = useControlled({
    name: 'open',
    controlled: openProps,
    default: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeBasicData>({
    defaultValues: initData,
  });

  const handleClickOpen = () => {
    setOpen(true);
    onChange?.(true);
  };

  const handleClose = () => {
    setOpen(false);
    onChange?.(false);
  };

  const trigger =
    !ignoreTrigger &&
    (children || (
      <Button variant="outlined" onClick={handleClickOpen}>
        Open
      </Button>
    ));

  const triggerOnClick = async (e: any) => {
    setOpen(true);
    onChange?.(true);
    trigger && trigger.props?.onClick?.(e);
  };

  const onSubmit = async (data: ResumeBasicData) => {
    setSubmitting(true);
    const result = await props.onSubmit({
      ...data,
      ...(data.birthday && { birthday: dayjs(data.birthday).format('YYYY/MM/DD') }),
      age: parseInt(String(data.age), 10),
    });
    setSubmitting(false);
    if (result) {
      setOpen(false);
      onChange?.(false);
    }
  };

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: triggerOnClick,
        })}

      <Dialog fullWidth maxWidth="lg" fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">基本信息</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { my: 2 },
            }}
            autoComplete="off"
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="name"
                  control={control}
                  errors={errors}
                  rules={{
                    required: '姓名不能为空',
                  }}
                  inputField={{
                    label: '姓名',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="nameConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: true,
                        showLabel: false,
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="job"
                  control={control}
                  errors={errors}
                  rules={{
                    required: '求职目标不能为空',
                  }}
                  inputField={{
                    label: '求职目标',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="jobConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: true,
                        showLabel: true,
                        label: '求职目标',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="mobile"
                  control={control}
                  errors={errors}
                  rules={{
                    required: '联系电话不能为空',
                  }}
                  inputField={{
                    label: '联系电话',
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="mobileConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: true,
                        showLabel: false,
                        label: '电话',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="email"
                  control={control}
                  errors={errors}
                  rules={{
                    required: '邮箱不能为空',
                    pattern: {
                      value: emailRegex,
                      message: '邮箱格式不正确',
                    },
                  }}
                  inputField={{
                    label: '邮箱',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="emailConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: true,
                        showLabel: false,
                        label: '邮箱',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="educationalQualifications"
                  control={control}
                  errors={errors}
                  inputField={{
                    label: '学历',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="educationalQualificationsConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: true,
                        showLabel: false,
                        label: '学历',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="website"
                  control={control}
                  errors={errors}
                  inputField={{
                    label: '个人网站',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="websiteConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: false,
                        showLabel: false,
                        label: '网站',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="age"
                  control={control}
                  errors={errors}
                  inputField={{
                    type: 'number',
                    label: '年龄',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="ageConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: false,
                        showLabel: false,
                        label: '年龄',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="birthday"
                  control={control}
                  rules={{
                    validate: isDate,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      disableFuture
                      label="生日"
                      views={['year', 'month', 'day']}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={errors?.birthday?.message as string}
                          error={!!errors?.birthday}
                          fullWidth
                        />
                      )}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="birthdayConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: false,
                        showLabel: false,
                        label: '生日',
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <InputField<ResumeBasicData>
                  name="avatar"
                  control={control}
                  errors={errors}
                  inputField={{
                    label: '头像',
                    helperText: '当前只支持网络图片地址，推荐大小 3.5cm * 5.2cm',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  name="avatarConfig"
                  control={control}
                  render={({ field }) => (
                    <KVConfigField
                      defaultValues={{
                        visible: false,
                        showLabel: false,
                      }}
                      {...field}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="text" onClick={handleClose}>
            取消
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            loading={submitting}
            variant="contained"
            type="submit"
            autoFocus
          >
            保存
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
