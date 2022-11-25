import React from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import helpers from '@/utils/helpers';

// Components
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  MenuItem,
  DialogContent,
  Toolbar,
} from '@mui/material';
import { InputLabel, FormControl, DialogTitle, FormControlLabel, Grid } from '@mui/material';
import { TextField, DialogActions, Select } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import InputField from '@/components/Form/InputField';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';

// Hooks
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useMediaQuery, useTheme, useControlled } from '@mui/material';

// Constant
import moduleTitleMap from '@/components/Resume/Templates/moduleTitleMap';
import { educationMap } from '@/components/Resume/ContentBox/contentMap';

// Types
export interface EducationModalFormProps {
  children?: React.ReactElement;
  ignoreTrigger?: boolean;
  open?: boolean;
  initData?: any;
  onSubmit: (data: EducationData) => Promise<boolean>;
  onChange?: (open: boolean) => void;
}

export interface EducationDetail {
  desc?: string;
  endOn: string | null;
  startOn: string | null;
  id?: number;
  name?: string;
  universityMajors?: string;
  sortIndex: number;
}

export interface EducationData {
  label: string;
  visible: boolean;
  moduleTitleType: string;
  contentType: string;
  educationDetails: EducationDetail[];
  removeIds?: (string | number)[];
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EducationData>({
    defaultValues: {
      ...initData,
      educationDetails: _.sortBy(initData.educationDetails, ['sortIndex'])
    },
  });

  React.useEffect(() => {
    reset({
      ...initData,
      educationDetails: _.sortBy(initData.educationDetails, ['sortIndex'])
    })
  }, [initData])

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'educationDetails',
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
    setSubmitting(true);

    const filteredEducationDetails = (data.educationDetails || [])
      .filter(
        (item) =>
          item.desc || item.endOn || item.id || item.name || item.startOn || item.universityMajors,
      )
      .map((item, index) => ({ ...item, sortIndex: index }));

    // 过滤被删除的数据
    const educationDetailFormIds = filteredEducationDetails.map((i) => i.id).filter((i) => !!i);
    const removeIds = _.filter(
      initData.educationDetails,
      (i) => !educationDetailFormIds.includes(i.id),
    ).map((i) => i.id);

    const result = await props.onSubmit({
      ...data,
      educationDetails: filteredEducationDetails,
      // 删除的子项 ID
      removeIds,
    });

    setSubmitting(false);
    if (result) {
      setOpen(false);
      onChange?.(false);
    }
  };

  // 追加一条新的记录
  const handleAppend = () => {
    append({ name: '', startOn: null, endOn: null, desc: '', universityMajors: '', sortIndex: 0 });
  };

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
                  <InputLabel id="module-title-type-select-label">标题样式</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select labelId="module-title-type-select-label" label="标题样式" {...field}>
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
                      required: '标题样式不能为空',
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="module-title-type-select-label">内容样式</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select labelId="module-title-type-select-label" label="内容样式" {...field}>
                        {_.map(educationMap, (item, key) => {
                          const ContentComponent = item.preview;

                          return (
                            <MenuItem key={key} value={key}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  width: '100%',
                                  height: 23,
                                }}
                              >
                                <ContentComponent selectedItem />
                              </Box>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                    name="contentType"
                    control={control}
                    rules={{
                      required: '内容样式不能为空',
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6} alignSelf="center">
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

            <Divider textAlign="left" sx={{ my: 2 }}>
              详情列表
            </Divider>

            <Box>
              {fields.map((field, index) => {
                return (
                  <Box key={field.id} sx={{ mt: 1 }}>
                    <Toolbar
                      variant="dense"
                      sx={{ background: theme.palette.grey[50], borderRadius: 10 }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        disabled={index === 0}
                        startIcon={<ArrowDropUpIcon />}
                        onClick={() => move(index, index - 1)}
                        sx={{ mr: 1 }}
                      >
                        向上移动
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        disabled={index === fields.length - 1}
                        startIcon={<ArrowDropDownIcon />}
                        sx={{ mr: 1 }}
                        onClick={() => move(index, index + 1)}
                      >
                        向下移动
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ mr: 1 }}
                        onClick={() => remove(index)}
                      >
                        删除
                      </Button>
                    </Toolbar>

                    <Grid spacing={1} container>
                      <Grid item xs={12} sm={6} md={3}>
                        <InputField<any>
                          name={`educationDetails.${index}.name`}
                          control={control}
                          errors={errors}
                          inputField={{
                            label: '学校名称',
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <InputField<any>
                          name={`educationDetails.${index}.universityMajors`}
                          control={control}
                          errors={errors}
                          inputField={{
                            label: '专业名称',
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} sm={6} md={3}>
                        <Controller
                          name={`educationDetails.${index}.startOn`}
                          control={control}
                          rules={{
                            validate: helpers.isDate,
                          }}
                          render={({ field }) => (
                            <DatePicker
                              disableFuture
                              label="开始时间"
                              views={['year', 'month']}
                              renderInput={(params) => <TextField {...params} fullWidth />}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={6} sm={6} md={3}>
                        <Controller
                          name={`educationDetails.${index}.endOn`}
                          control={control}
                          rules={{
                            validate: helpers.isDate,
                          }}
                          render={({ field }) => (
                            <DatePicker
                              disableFuture
                              label="结束时间"
                              views={['year', 'month']}
                              renderInput={(params) => <TextField {...params} fullWidth />}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <InputField<any>
                          name={`educationDetails.${index}.desc`}
                          control={control}
                          errors={errors}
                          inputField={{
                            label: '描述',
                            multiline: true,
                            maxRows: 10,
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                );
              })}
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                <Button onClick={handleAppend}>新增一条记录</Button>
              </Box>
            </Box>
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
