import React from 'react';
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
import { projectMap } from '@/components/Resume/ContentBox/contentMap';

// Types
import type { Project } from '@/components/Resume/types';

export interface ProjectModalFormProps {
  children?: React.ReactElement;
  ignoreTrigger?: boolean;
  open?: boolean;
  initData?: any;
  onSubmit: (data: Project) => Promise<boolean>;
  onChange?: (open: boolean) => void;
}

export default function ProjectModalForm(props: ProjectModalFormProps) {
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
  } = useForm<Project>({
    defaultValues: {
      ...initData,
      projectDetails: _.sortBy(initData.projectDetails, ['sortIndex'])
    },
  });

  React.useEffect(() => {
    reset({
      ...initData,
      projectDetails: _.sortBy(initData.projectDetails, ['sortIndex'])
    })
  }, [initData])

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'projectDetails',
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

  const onSubmit = async (data: Project) => {
    setSubmitting(true);


    const filteredProjectDetails = (data.projectDetails || [])
      .filter(
        (item) =>
          item.desc || item.endOn || item.id || item.name || item.startOn || item.role,
      )
      .map((item, index) => ({ ...item, sortIndex: index }));

    // ????????????????????????
    const projectDetailFormIds = filteredProjectDetails.map((i) => i.id).filter((i) => !!i);
    const removeIds = _.filter(
      initData.projectDetails,
      (i) => !projectDetailFormIds.includes(i.id),
    ).map((i) => i.id);

    const result = await props.onSubmit({
      ...data,
      projectDetails: filteredProjectDetails,
      // ??????????????? ID
      removeIds,
    });

    setSubmitting(false);
    if (result) {
      setOpen(false);
      onChange?.(false);
    }
  };

  // ????????????????????????
  const handleAppend = () => {
    append({ name: '', startOn: null, endOn: null, desc: '', role: '', sortIndex: 0 });
  };

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: triggerOnClick,
        })}

      <Dialog fullWidth maxWidth="lg" fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">????????????</DialogTitle>
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
                <InputField<Project>
                  name="label"
                  control={control}
                  errors={errors}
                  rules={{
                    required: '????????????????????????',
                  }}
                  inputField={{
                    label: '????????????',
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="module-title-type-select-label">????????????</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select labelId="module-title-type-select-label" label="????????????" {...field}>
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
                      required: '????????????????????????',
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="module-title-type-select-label">????????????</InputLabel>
                  <Controller
                    render={({ field }) => (
                      <Select labelId="module-title-type-select-label" label="????????????" {...field}>
                        {_.map(projectMap, (item, key) => {
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
                      required: '????????????????????????',
                    }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={6} alignSelf="center">
                <Controller
                  render={({ field }) => (
                    <FormControlLabel
                      control={<Checkbox size="small" {...field} checked={field.value} />}
                      label="????????????"
                    />
                  )}
                  name="visible"
                  control={control}
                />
              </Grid>
            </Grid>

            <Divider textAlign="left" sx={{ my: 2 }}>
              ????????????
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
                        ????????????
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        disabled={index === fields.length - 1}
                        startIcon={<ArrowDropDownIcon />}
                        sx={{ mr: 1 }}
                        onClick={() => move(index, index + 1)}
                      >
                        ????????????
                      </Button>

                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ mr: 1 }}
                        onClick={() => remove(index)}
                      >
                        ??????
                      </Button>
                    </Toolbar>

                    <Grid spacing={1} container>
                      <Grid item xs={12} sm={6} md={3}>
                        <InputField<any>
                          name={`projectDetails.${index}.name`}
                          control={control}
                          errors={errors}
                          inputField={{
                            label: '????????????',
                          }}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <InputField<any>
                          name={`projectDetails.${index}.role`}
                          control={control}
                          errors={errors}
                          inputField={{
                            label: '????????????',
                          }}
                        />
                      </Grid>

                      <Grid item xs={6} sm={6} md={3}>
                        <Controller
                          name={`projectDetails.${index}.startOn`}
                          control={control}
                          rules={{
                            validate: helpers.isDate,
                          }}
                          render={({ field }) => (
                            <DatePicker
                              disableFuture
                              label="????????????"
                              views={['year', 'month']}
                              renderInput={(params) => <TextField {...params} fullWidth />}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={6} sm={6} md={3}>
                        <Controller
                          name={`projectDetails.${index}.endOn`}
                          control={control}
                          rules={{
                            validate: helpers.isDate,
                          }}
                          render={({ field }) => (
                            <DatePicker
                              disableFuture
                              label="????????????"
                              views={['year', 'month']}
                              renderInput={(params) => <TextField {...params} fullWidth />}
                              {...field}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <InputField<any>
                          name={`projectDetails.${index}.desc`}
                          control={control}
                          errors={errors}
                          inputField={{
                            label: '??????',
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
                <Button onClick={handleAppend}>??????????????????</Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="text" onClick={handleClose}>
            ??????
          </Button>
          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            loading={submitting}
            variant="contained"
            type="submit"
          >
            ??????
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
