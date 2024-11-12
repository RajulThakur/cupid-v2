"use client";
import { TextField } from "@mui/material";
import { ChangeEvent, useState, useEffect } from "react";
import useDebounce from "@/app/_hooks/useDebounce";
import { BASE_URL } from "@/app/_helper/config";

function Username({ name, label }: { name: string; label: string }) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const debounceSearch = useDebounce(value);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
    setIsError(false);
  };

    useEffect(() => {
      const check = async (): Promise<void> => {
        try {
          const response = await fetch(`${BASE_URL}/check_username`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: debounceSearch }),
          });

          const result = await response.json();
          if (!result.available) setIsError(true);
        } catch{
          console.log("Error checking username:");
      }
    };
    check();
  }, [debounceSearch]);

  return (
    <TextField
      error={isError}
      helperText={isError ? "Username is already taken" : " "}
      value={value}
      onChange={handleChange}
      label={label}
      name={name || label}
      variant="outlined"
      slotProps={{ formHelperText: { sx: {
        fontSize:"10px",
        marginLeft:"1px"
      } } }}
      fullWidth
    />
  );
}

export default Username;
