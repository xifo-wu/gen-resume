import React from 'react';
import _ from 'lodash';

// Components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import InputField from '@/components/Form/InputField';
import { Controller } from 'react-hook-form';

// Hooks
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery, useTheme, useControlled } from '@mui/material';

// Types
export interface EducationModalFormProps {
  children?: React.ReactElement;
  ignoreTrigger?: boolean;
  open?: boolean;
  initData?: any;
  onSubmit: (data: EducationData) => Promise<boolean>;
  onChange?: (open: boolean) => void;
}

// Constant
import moduleTitleMap from '@/components/Resume/Templates/moduleTitleMap';

export interface EducationData {
  label: string;
  visible: boolean;
  moduleTitleType: string;
}

export default function EducationModalForm(props: EducationModalFormProps) {
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
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationData>({
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

  const onSubmit = async (data: EducationData) => {
    console.log(data, 'submit');
    // setSubmitting(true);
    // const result = await props.onSubmit({
    //   ...data,
    // });
    // setSubmitting(false);
    // if (result) {
    //   setOpen(false);
    //   onChange?.(false);
    // }
  };

  console.log(watch('label'));

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: triggerOnClick,
        })}

      <Dialog fullWidth maxWidth="lg" fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">教育经历</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiFormControl-root': { my: 2 },
            }}
            autoComplete="off"
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} md={6}>
                <InputField<EducationData>
                  name="label"
                  control={control}
                  errors={errors}
                  rules={{
                    required: '模块名称不能为空',
                  }}
                  inputField={{
                    label: '模块名称',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="module-title-type-select-label">标题模块</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select labelId="module-title-type-select-label" label="标题模块" {...field}>
                        {_.map(moduleTitleMap, (ModuleTitleComponent, key) => {
                          return (
                            <MenuItem key={key} value={key}>
                              <Box sx={{ display: 'flex', alignItems: 'center', height: 23 }}>
                                <ModuleTitleComponent
                                  selectedItem
                                  data={{
                                    visible: true,
                                    label: watch('label'),
                                  }}
                                />
                              </Box>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                    name="moduleTitleType"
                    control={control}
                    rules={{
                      required: '标题模块不能为空',
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Controller
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox size="small" {...field} checked={field.value} />}
                      label="显示模块"
                    />
                  )}
                  name="visible"
                  control={control}
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
          >
            保存
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
