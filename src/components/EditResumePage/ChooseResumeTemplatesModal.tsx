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
import Card, { CardProps } from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import LoadingButton from '@mui/lab/LoadingButton';
import ChooseModuleItemCard from './ChooseModuleItemCard';

// Constant
import modules from '@/components/Resume/modules';

// types
import type { ModuleItemCardProps } from './ChooseModuleItemCard';

export interface ChooseResumeModuleModalProps {
  children?: React.ReactElement;
  ignoreTrigger?: boolean;
  open?: boolean;
  onSubmit: (select: string) => Promise<boolean>;
  onChange?: (open: boolean) => void;
}

const templates = [
  {
    id: '1',
    key: 'style1',
    cover: 'https://s1.ax1x.com/2022/10/21/x6Wl7V.jpg',
    name: '不会取名字',
  },
  {
    id: '2',
    key: 'style2',
    cover: 'https://s1.ax1x.com/2022/10/22/xcyYx1.jpg',
    name: '不会取名字',
  },
];

interface TemplateCardProps extends CardProps {
  data: {
    id: string;
    cover: string;
    name: string;
  };
  selected: boolean;
}

const TemplateCard = ({ data, selected, ...rest }: TemplateCardProps) => {
  return (
    <Card
      sx={(theme) => ({
        border: `1px solid ${selected? theme.palette.primary.main : 'transparent'}`,
        maxWidth: 345,
      })}
      {...rest}
    >
      <CardActionArea sx={{ pb: 'calc(100% / (178.66 / 256))', height: 0, overflow: 'hidden' }}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            margin: '0',
            padding: '0',
            ...(selected && {
              '&:after': {
                position: 'absolute',
                insetBlockStart: '2px',
                insetInlineEnd: '2px',
                width: '0',
                height: '0',
                border: `12px solid ${theme.palette.primary.main}`,
                borderBlockEnd: '12px solid transparent',
                borderInlineStart: '12px solid transparent',
                borderStartEndRadius: '2px',
                content: '""',
              },
            }),
          })}
        >
          <CardMedia component="img" height="100%" image={data.cover} />
        </Box>
      </CardActionArea>
    </Card>
  );
};

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

  const handleSelect = (id: string) => {
    console.log("id", id)
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
        maxWidth="lg"
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">选择模版</DialogTitle>

        <DialogContent>
          <Grid container spacing={2}>
            {templates.map((item) => (
              <Grid key={item.id} item lg={3} md={3} xs={6} sm={4}>
                <TemplateCard data={item} selected={selected === item.key} onClick={() => handleSelect(item.key)} />
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
