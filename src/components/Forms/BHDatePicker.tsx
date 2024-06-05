import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
}

const BHDatePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth = true,
  sx,
}: IDatePicker) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;
  return (
    <>
      <div style={{ width: "100%", textAlign: "start" }}>
        {label ? label : null}
      </div>
      <Controller
        name={name}
        control={control}
        defaultValue={dayjs(new Date().toDateString())}
        render={({ field: { onChange, value, ...field } }) => {
          return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                timezone="system"
                {...field}
                onChange={(date) => onChange(date)}
                value={dayjs(new Date(value))}
                slotProps={{
                  textField: {
                    required: required,
                    size: size,
                    sx: {
                      ...sx,
                    },
                    variant: "outlined",
                    fullWidth: fullWidth,
                  },
                }}
              />
            </LocalizationProvider>
          );
        }}
      />
    </>
  );
};

export default BHDatePicker;
