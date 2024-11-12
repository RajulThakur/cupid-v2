import { TextField } from "@mui/material";

function InputField({
  label,
  name,
  isError,
  ErrMessage,
  disabled,
}: {
  label: string;
  name?: string;
  isError: boolean;
  ErrMessage: string;
  disabled: boolean;
}) {
  if (isError) {
    return (
      <TextField
        error
        helperText={ErrMessage}
        id='outlined-basic'
        label={label}
        name={name || label}
        variant='outlined'
        fullWidth
        disabled={disabled}
      />
    );
  } else {
    return (
      <TextField
        helperText=' '
        slotProps={{
          formHelperText: {
            sx: {
              fontSize: "10px",
              marginLeft: "1px",
            },
          },
        }}
        id='outlined-basic'
        label={label}
        name={name || label}
        variant='outlined'
        fullWidth
        disabled={disabled}
      />
    );
  }
}

export default InputField;
