"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { MouseEvent, useState } from "react";

function PasswordField({ name, disabled, isError, ErrMessage }: { name: string; disabled: boolean; isError: boolean; ErrMessage: string }) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  function handleClick(): void {
    setShowPassword((curr: boolean) => !curr);
  }
  const handleMouseEnter = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };
  return (
    <FormControl
      fullWidth
      variant='outlined'
      disabled={disabled}>
      <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        name={name}
        type={showPassword ? "text" : "password"}
        disabled={disabled}
        error={isError}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClick}
              onMouseDown={handleMouseEnter}
              onMouseUp={handleMouseEnter}
              edge='end'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label='Password'
      />
    </FormControl>
  );
}

export default PasswordField;
