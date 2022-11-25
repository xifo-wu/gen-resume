import React from 'react';
import _ from 'lodash';

// Components
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import ChooseIconField from '@/components/Form/ChooseIconField';
import InputField from '@/components/Form/InputField';

// Hooks
import { Controller, useForm } from 'react-hook-form';

// Types
import { KVConfig } from '@/components/Resume/types';

interface Props {
  value: KVConfig;
  defaultValues?: KVConfig;
  onChange: (v: string) => void;
}

// 键值对配置字段
// 控制显示隐藏
// 是否显示标签
// 标签名称
// 图标配置
// 自定义样式
const KVConfigField = React.forwardRef<unknown, Props>(function KVConfigField(props, ref) {
  const { defaultValues, value: valueProps, onChange } = props;

  const { control, watch } = useForm<KVConfig>({
    defaultValues: valueProps,
  });

  React.useEffect(() => {
    onChange(JSON.stringify(watch()));
  });

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto">
          <ChooseIconField control={control} name="icon" />
        </Grid>
        <Grid item xs="auto">
          <FormGroup>
            <Controller
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox size="small" {...field} checked={field.value} />}
                  label="显示"
                />
              )}
              name="visible"
              control={control}
            />

            <Controller
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox size="small" {...field} checked={field.value} />}
                  label="显示标签"
                />
              )}
              name="showLabel"
              control={control}
            />
          </FormGroup>
        </Grid>
        <Grid item xs>
          <InputField
            name="label"
            control={control}
            inputField={{
              label: '标签',
              fullWidth: true,
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
});

export default KVConfigField;
