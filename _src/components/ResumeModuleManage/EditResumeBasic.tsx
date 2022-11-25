import React from 'react';
import api from '@/utils/api';

// Components
import { Controller } from 'react-hook-form';
import { Box, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import Form from '@/components/Form';
import InputField from '@/components/Form/InputField';
import Input from '@mui/material/Input';

// Hooks
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import styles from './styles';
import { useEffect, useRef } from 'react';
import { useSWRConfig } from 'swr';

const formFiled = [
  {
    key: 'name',
    label: '姓名',
  },
  {
    key: 'job',
    label: '求职目标',
  },
  {
    key: 'email',
    label: '邮箱',
  },
  {
    key: 'mobile',
    label: '电话',
  },
  {
    key: 'educationalQualifications',
    label: '学历',
  },
  {
    key: 'website',
    label: '网站',
  },
  {
    key: 'birthday',
    label: '生日',
  },
  {
    key: 'age',
    label: '年龄',
  },
  {
    key: 'avatar',
    label: '头像',
  },
];

interface Props {
  data: any;
}

const EditResumeBasic = ({ data }: Props) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const resumeApiUrl = `/api/v1/resumes/${router.query.slug}`;

  const formChangeTimer = useRef<NodeJS.Timeout>();
  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: data.resumeBasic,
  });

  async function onSubmit(formData: any) {
    mutate(resumeApiUrl, () => api.put(`${resumeApiUrl}/resume-basic`, formData), {
      revalidate: false,
    });
  }

  function handleFormChange() {
    clearTimeout(formChangeTimer.current);

    formChangeTimer.current = setTimeout(() => {
      handleSubmit(onSubmit)();
    }, 2000);
  }

  return (
    <Box>
      <Typography variant="subtitle2">基本信息</Typography>

      <Form onChange={handleFormChange} sx={{ mt: 1 }}>
        {formFiled.map((item) => (
          <React.Fragment key={item.key}>
            <Typography variant="body2">{item.label}</Typography>
            <Grid container spacing={1} alignItems="center">
              {watch(`${item.key}.showLabel`) && (
                <>
                  <Grid item>
                    <InputField
                      name={`${item.key}.label`}
                      control={control}
                      inputField={{
                        label: '显示标签',
                        size: 'small',
                        sx: styles.input,
                        hiddenLabel: true,
                        placeholder: '请输入显示标签',
                      }}
                    />
                  </Grid>
                  <Grid item>:</Grid>
                </>
              )}

              <Grid item>
                <InputField
                  name={`${item.key}.value`}
                  control={control}
                  inputField={{
                    label: '显示内容',
                    size: 'small',
                    sx: styles.input,
                    hiddenLabel: true,
                    placeholder: '请输入显示内容',
                  }}
                />
              </Grid>
              <Grid item>
                <Controller
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          {...field}
                          checked={field.value}
                          sx={{
                            '&.MuiCheckbox-colorPrimary': {
                              color: '#fff',
                            },
                          }}
                        />
                      }
                      label="显示标签"
                    />
                  )}
                  name={`${item.key}.showLabel`}
                  control={control}
                />
              </Grid>
              <Grid item>
                <Controller
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          {...field}
                          checked={field.value}
                          sx={{
                            '&.MuiCheckbox-colorPrimary': {
                              color: '#fff',
                            },
                          }}
                        />
                      }
                      label="显示模块"
                    />
                  )}
                  name={`${item.key}.visible`}
                  control={control}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
      </Form>
    </Box>
  );
};

export default EditResumeBasic;
