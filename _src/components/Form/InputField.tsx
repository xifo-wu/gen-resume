import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import type { FieldErrorsImpl, FieldValues, ControllerProps } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';

interface InputFieldProps<T extends FieldValues> extends Omit<ControllerProps<T>, 'render'> {
  inputField: TextFieldProps;
  errors?: FieldErrorsImpl;
}

export default function InputField<T extends FieldValues>({
  name,
  errors,
  inputField,
  ...rest
}: InputFieldProps<T>) {
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
          {...inputField}
          {...field}
        />
      )}
    />
  );
}
