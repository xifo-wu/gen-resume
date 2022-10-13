import React from 'react';
import _ from 'lodash';

import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import type { FieldValues, ControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';

// Hooks
import { useState } from 'react';
import {
  Button,
  DialogActions,
  Icon,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// Constant
import icons from './icons';
import Box from '@mui/system/Box';

interface ChooseIconFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, 'render'> {}

interface IconsModalProps {
  value: string;
  onChange: (v: string) => void;
}

const IconsModal = React.forwardRef<unknown,IconsModalProps>(function IconsModal(props, ref) {
  const { value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const triggerOnClick = async (e: any) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (iconName: string) => {
    setSelected(iconName);
  };

  const handleSubmit = () => {
    onChange(selected);
    setOpen(false);
  };

  const handleRemoveIcon = () => {
    onChange('');
    setSelected('');
    setOpen(false);
  }

  return (
    <>
      <Tooltip title="选择图标">
        <IconButton onClick={triggerOnClick}>
          <Icon>{value || 'add'}</Icon>
        </IconButton>
      </Tooltip>

      <Dialog fullWidth maxWidth="lg" fullScreen={fullScreen} open={open} onClose={handleClose}>
        <DialogTitle id="responsive-dialog-title">选择图标</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {_.map(icons.categories, (item) => (
              <Grid key={item.key} item xs={12}>
                <Box sx={{ textTransform: 'uppercase', mb: 2 }}>{item.name}</Box>
                <Grid container spacing={2}>
                  {_.map(item.icons, (icon) => (
                    <Grid key={icon.ligature} item xs="auto">
                      <Box
                        sx={{
                          p: 1,
                          borderRadius: 1,
                          borderColor:
                            icon.ligature === selected ? theme.palette.primary.main : 'transparent',
                          borderStyle: 'dashed',
                          borderWidth: 1,
                        }}
                        onClick={() => handleSelect(icon.ligature)}
                      >
                        <Icon sx={{ display: 'block', fontSize: 32 }}>{icon.ligature}</Icon>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="text" onClick={handleRemoveIcon}>
            移除图标
          </Button>
          <Button variant="text" onClick={handleClose}>
            取消
          </Button>
          <LoadingButton onClick={handleSubmit} variant="contained" type="submit">
            确认
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default function ChooseIconField<T extends FieldValues>({
  name,
  defaultValue,
  ...rest
}: ChooseIconFieldProps<T>) {
  return <Controller name={name} {...rest} render={({ field }) => <IconsModal {...field} />} />;
}
