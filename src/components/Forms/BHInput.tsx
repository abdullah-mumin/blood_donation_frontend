import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  value?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  required?: boolean;
};

const BHInput = ({
  label,
  name,
  value,
  type = "text",
  fullWidth,
  size = "small",
  required,
}: TInputProps) => {
  const { control, setValue } = useFormContext();
  const [internalValue, setInternalValue] = useState(value || "");

  // Update the internal state if the value prop changes
  useEffect(() => {
    setInternalValue(value || "");
  }, [value]);

  // Update the form value when internalValue changes
  useEffect(() => {
    setValue(name, internalValue);
  }, [internalValue, name, setValue]);

  return (
    <>
      <div style={{ width: "100%", textAlign: "start" }}>
        {label ? label : null}
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            placeholder={label}
            type={type}
            variant="outlined"
            size={size}
            fullWidth={fullWidth}
            value={internalValue}
            required={required}
            error={!!error?.message}
            helperText={error?.message}
            onChange={(e) => setInternalValue(e.target.value)}
          />
        )}
      />
    </>
  );
};

export default BHInput;
