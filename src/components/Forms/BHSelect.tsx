import React, { useEffect } from "react";
import { ListItemText, MenuItem, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IBloodType {
  label: string;
  value: string;
}

interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  bloodValue?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: IBloodType[];
}

const BHSelect = ({
  items,
  name,
  label,
  bloodValue,
  size = "small",
  required,
  fullWidth = true,
  sx,
}: ITextField) => {
  const { control, formState, setValue } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  useEffect(() => {
    if (bloodValue) {
      setValue(name, bloodValue);
    }
  }, [bloodValue, name, setValue]);

  return (
    <>
      <div style={{ width: "100%", textAlign: "start" }}>
        {label ? label : null}
      </div>
      <Controller
        control={control}
        name={name}
        defaultValue={bloodValue || ""}
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              ...sx,
            }}
            size={size}
            select
            required={required}
            fullWidth={fullWidth}
            error={isError}
            helperText={
              isError ? (formState.errors[name]?.message as string) : ""
            }
            onChange={(event) => {
              const selectedValue = event.target.value;
              field.onChange(selectedValue);
              setValue(name, selectedValue);
            }}
          >
            <MenuItem disabled value="">
              <em>{label}</em>
            </MenuItem>
            {items.map((item) => (
              <MenuItem key={item?.value} value={item?.value}>
                <ListItemText
                  primary={item.label}
                  sx={{ textAlign: "start" }}
                />
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </>
  );
};

export default BHSelect;
