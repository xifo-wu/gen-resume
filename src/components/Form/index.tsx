import React from 'react';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material';

interface FormProps extends Pick<BoxProps, 'sx'> {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}

const Form = ({ onSubmit, children, sx }: FormProps) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { my: 2 },
        ...sx,
      }}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      {children}
    </Box>
  );
};

export default Form;
