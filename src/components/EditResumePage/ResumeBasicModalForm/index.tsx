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

// Components
import Grid from '@mui/material/Grid';
import InputField from '@/components/Form/InputField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Hooks
import { useControlled } from '@mui/material';

// Constant
import { emailRegex } from '@/enums/const';
import dayjs, { Dayjs } from 'dayjs';

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
  email: string;
  job: string;
  mobile: string;
  avatar: string;
  educationalQualifications: string;
  website: string;
  birthday: string;
  age: number;
}

const isDate = (value: any) => {
  if (!value) {
    return true;
  }

  if (value.isValid()) {
    return true;
  }

  return '时间存在错误有误'
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
    watch,
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
    console.log(data.birthday, "xxxx")
    setSubmitting(true);
    const result = await props.onSubmit({
      ...data,
      birthday: dayjs(data.birthday).format("YYYY/MM/DD")
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
              <Grid item xs={12} sm={6} md={4}>
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

              <Grid item xs={12} sm={6} md={4}>
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

              <Grid item xs={12} sm={6} md={4}>
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

              <Grid item xs={12} sm={6} md={4}>
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

              <Grid item xs={12} sm={6} md={4}>
                <InputField<ResumeBasicData>
                  name="avatar"
                  control={control}
                  errors={errors}
                  inputField={{
                    label: '头像',
                    helperText: '当前只支持网络图片地址，推荐大小 200 * 100',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <InputField<ResumeBasicData>
                  name="educationalQualifications"
                  control={control}
                  errors={errors}
                  inputField={{
                    label: '学历',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <InputField<ResumeBasicData>
                  name="website"
                  control={control}
                  errors={errors}
                  inputField={{
                    label: '个人网站',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
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

              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="birthday"
                  control={control}
                  rules={{
                    validate: isDate,
                  }}
                  render={({ field }) => (
                    <DatePicker
                      disableFuture
                      // inputFormat="yyyy/MM/DD"
                      label="生日"
                      // mask="____/__/__"
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
