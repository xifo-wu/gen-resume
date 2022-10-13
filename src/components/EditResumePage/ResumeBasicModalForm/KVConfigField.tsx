import React from 'react';

// Components
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Icon from '@mui/material/Icon';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ChooseIconField from '@/components/Form/ChooseIconField';

// Hooks
import { Controller, useForm } from 'react-hook-form';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

interface ConfigData {
  visible: boolean;
  showLabel: boolean;
  icon: string;
}

// 键值对配置字段
// 控制显示隐藏
// 是否显示标签
// 图标配置
// 自定义样式
const KVConfigField = (props: Props) => {
  const { value: valueProps, onChange } = props;

  const { register, control, watch } = useForm<ConfigData>({
    defaultValues: valueProps ? JSON.parse(valueProps) : {},
  });

  React.useEffect(() => {
    console.log(watch());

    onChange(JSON.stringify(watch()));
  });

  return (
    <Box>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs="auto">
          <Tooltip title="选择图标" placement="top">
            <ChooseIconField control={control} name="icon" />
            {/* <IconButton aria-label="Example">
              <Icon>add</Icon>
            </IconButton> */}
          </Tooltip>
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
      </Grid>
    </Box>
  );
};

export default KVConfigField;
