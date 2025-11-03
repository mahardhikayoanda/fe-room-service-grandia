import React from "react";

import TextField, { type TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/utils/index";

import ControllWrapper from "./FormControlWrapper";

interface Props<T extends FieldValues>
  extends Omit<TextFieldProps, "outlined"> {
  name?: Path<T>;
  control?: Control<T, any, FieldValues>;
  // helperText?: string;
  manipulate?: (value: string) => string | number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TextInput = <T extends FieldValues>({
  placeholder,
  name,
  control,
  manipulate,
  className,
  helperText,
  startIcon,
  endIcon,
  ...props
}: Props<T>) => {
  const inputProps = {
    ...(startIcon && {
      startAdornment: (
        <InputAdornment position="start">
          <span className="text-gray-400">{startIcon}</span>
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          <span className="text-gray-400">{endIcon}</span>
        </InputAdornment>
      ),
    }),
  };

  return control ? (
    <ControllWrapper<T>
      name={name as Path<T>}
      control={control}
      render={({ onChange, ...field }) => (
        <TextField
          className={cn(props.hidden && "hidden", className)}
          placeholder={placeholder}
          onChange={(e) =>
            onChange({
              ...e,
              target: { value: manipulate?.(e.target.value) ?? e.target.value },
            })
          }
          slotProps={{
            input: inputProps,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#FAFAFA",
              "& fieldset": {
                borderColor: "#E5E7EB",
              },
              "&:hover fieldset": {
                borderColor: "#D1D5DB",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#9CA3AF",
                borderWidth: "1px",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#374151",
              fontWeight: 500,
              "&.Mui-focused": {
                color: "#374151",
              },
            },
            "& .MuiInputLabel-asterisk": {
              color: "#EF4444",
            },
          }}
          {...field}
          {...props}
          helperText={field.error ? field.helperText : helperText}
        />
      )}
    />
  ) : (
    <TextField
      placeholder={placeholder}
      slotProps={{
        input: inputProps,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#FAFAFA",
          "& fieldset": {
            borderColor: "#E5E7EB",
          },
          "&:hover fieldset": {
            borderColor: "#D1D5DB",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#9CA3AF",
            borderWidth: "1px",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#374151",
          fontWeight: 500,
          "&.Mui-focused": {
            color: "#374151",
          },
        },
        "& .MuiInputLabel-asterisk": {
          color: "#EF4444",
        },
      }}
      {...props}
    />
  );
};

export default TextInput;
