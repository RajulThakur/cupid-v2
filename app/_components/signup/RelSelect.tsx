"use client";
import { RELATIONSHIP_STATUS } from "@/app/_helper/config";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";



export default function RelSelect() {
  const [relStatus, setRelStatus] = useState<string>("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setRelStatus(event.target.value);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="relationship-label">Relationship</InputLabel>
      <Select
        labelId="relationship-label"
        id="relationship-select-label"
        value={relStatus}
        label="Relationship"
        name="relationshipStatus"
        onChange={handleChange}
      >
        {RELATIONSHIP_STATUS.map((relsta) => (
          <MenuItem value={relsta} key={relsta}>
            {`${relsta}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
