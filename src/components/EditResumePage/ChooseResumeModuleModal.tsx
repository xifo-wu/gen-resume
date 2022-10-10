import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useControlled, useTheme } from '@mui/material';
import { toast } from 'react-toastify';

// components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import LoadingButton from '@mui/lab/LoadingButton';
import ChooseModuleItemCard from './ChooseModuleItemCard';

// types
import type { ModuleItemCardProps } from './ChooseModuleItemCard';

export interface ChooseResumeModuleModalProps {
  children?: React.ReactElement;
  ignoreTrigger?: boolean;
  open?: boolean;
  onSubmit: (select: string) => Promise<boolean>;
  onChange?: (open: boolean) => void;
}

const modules = [
  {
    id: 'workExperiences',
    name: '工作经历',
    en: 'Work Experiences',
  },
  {
    id: 'educations',
    name: '教育经历',
    en: 'Educations',
  },
  {
    id: 'projects',
    name: '项目经历',
    en: 'Projects',
  },
  {
    id: 'skills',
    name: '专业技能',
    en: 'Professional Skills',
  },
  {
    id: 'certificates',
    name: '技能证书',
    en: 'Skill Certificates',
  },
];

export default function ChooseResumeModuleModal(props: ChooseResumeModuleModalProps) {
  const { children, open: openProps, ignoreTrigger = false, onChange } = props;
  const [open, setOpen] = useControlled({
    name: 'open',
    controlled: openProps,
    default: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [selected, setSelected] = useState('');

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

  const onSubmit = async () => {
    if (!selected) {
      toast.error('请选择要添加的模块');
      return;
    }

    setSubmitting(true);
    const result = await props.onSubmit(selected);
    setSubmitting(false);
    if (result) {
      setOpen(false);

      onChange?.(false);
    }
  };

  const handleSelect = (id: string, data: ModuleItemCardProps['data']) => {
    setSelected(id === selected ? '' : id);
  };

  return (
    <>
      {trigger &&
        React.cloneElement(trigger, {
          ...trigger.props,
          onClick: triggerOnClick,
        })}
      <Dialog
        fullWidth
        maxWidth="md"
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">添加模块</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {modules.map((item) => (
              <Grid key={item.id} item md={4} xs={12} sm={6}>
                <ChooseModuleItemCard
                  selected={selected === item.id}
                  data={item}
                  onClick={handleSelect}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="text" onClick={handleClose}>
            取消
          </Button>
          <LoadingButton loading={submitting} variant="contained" onClick={onSubmit} autoFocus>
            添加
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
