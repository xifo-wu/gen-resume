import React, { FormHTMLAttributes } from 'react';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material';

interface FormProps extends Pick<BoxProps, 'sx'>, FormHTMLAttributes<any> {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Form = ({ onSubmit, children, sx, ...rest }: FormProps) => {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { my: 2 },
        ...sx,
      }}
      autoComplete="off"
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Form;
