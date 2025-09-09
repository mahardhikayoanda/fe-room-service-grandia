import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DatePickerProps } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import { Control, FieldValues, Path } from "react-hook-form";

import ControllWrapper from "./FormControlWrapper";
import { cn } from "@/utils";
import { SxProps } from "@mui/material";
import dayjs from "dayjs";

interface Props<T extends FieldValues> extends DatePickerProps<any> {
  height?: number;
  name?: Path<T>;
  control?: Control<T>;
  className?: string;
  placeholder?: string;
  hidden?: boolean;
  format?: string;
  disableBorder?: boolean;
  padding?: string;
  fieldError?: any;
  helperText?: string;
  errorPadding?: string;
}

const DatePickerInput = <T extends FieldValues>({
  height = 48,
  name,
  control,
  className,
  placeholder,
  hidden,
  format = "DD/MM/YYYY",
  disableBorder = false,
  padding = "14px 14px",
  fieldError,
  helperText,
  errorPadding = "0px 0px 0px 0px",
  ...props
}: Props<T>) => {
  const textFieldStyle: SxProps = {
    height,
    m: 0,
    p: 0,
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      height,
      ...(disableBorder
        ? {
            "& fieldset": { border: "none" },
          }
        : {
            "& fieldset": {
              borderColor: fieldError ? "#d32f2f" : "#8f8f8f",
            },
            "&:hover fieldset": {
              borderColor: fieldError ? "#d32f2f" : "#999999",
            },
            "&.Mui-focused fieldset": {
              borderColor: fieldError ? "#d32f2f" : "#1976d2",
            },
          }),
    },
    "& .MuiInputBase-input": {
      padding,
    },
    "& .MuiFormHelperText-root": {
      margin: 0,
      padding: errorPadding,
      fontSize: "0.75rem",
      lineHeight: 1.4,
      color: fieldError ? "#d32f2f" : "#666666",
      "&.Mui-error": {
        color: "#d32f2f",
      },
    },
  };

  // Render function for MUI DatePicker's textField slot
  const renderTextField = (params: any) => (
    <TextField
      {...params}
      hiddenLabel
      placeholder={placeholder}
      className={cn(hidden && "hidden", className)}
      sx={textFieldStyle}
      error={!!fieldError}
      helperText={fieldError?.message || helperText}
      variant="outlined"
      margin="normal"
    />
  );

  return control ? (
    <ControllWrapper<T>
      name={name as Path<T>}
      control={control}
      render={({ value, onChange }) => (
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={(date) =>
            onChange(date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : null)
          }
          format={format}
          {...props}
          slots={{
            textField: renderTextField,
          }}
        />
      )}
    />
  ) : (
    <DatePicker
      format={format}
      {...props}
      slots={{
        textField: renderTextField,
      }}
    />
  );
};

export default DatePickerInput;
