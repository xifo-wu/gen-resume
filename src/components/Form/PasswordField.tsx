import { useState } from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import type { FieldErrorsImpl, FieldValues, ControllerProps } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material/TextField';

interface InputFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, 'render'> {
  inputField: TextFieldProps;
  errors?: FieldErrorsImpl;
}

export default function PasswordField<T extends FieldValues>({
  name,
  errors,
  inputField,
  ...rest
}: InputFieldProps<T>) {
  const { ...resetInputField } = inputField;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      {...rest}
      render={({ field }) => (
        <TextField
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message as string}
          variant="outlined"
          fullWidth
          {...resetInputField}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...field}
        />
      )}
    />
  );
}
