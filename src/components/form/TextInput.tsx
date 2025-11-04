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
          <span className="text-[#7F7F7F]">{startIcon}</span>
        </InputAdornment>
      ),
    }),
    ...(endIcon && {
      endAdornment: (
        <InputAdornment position="end">
          <span className="text-[#7F7F7F]">{endIcon}</span>
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
              fontSize: "14px",
              "& fieldset": {
                borderColor: "transparent",
              },
              "&:hover fieldset": {
                borderColor: "transparent",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#9CA3AF",
                borderWidth: "1px",
              },
              "&.Mui-error fieldset": {
                borderColor: "#EF4444",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#7F7F7F",
              fontWeight: 500,
              fontSize: "14px",
              "&.Mui-focused": {
                color: "#7F7F7F",
              },
              "&.Mui-error": {
                color: "#EF4444",
              },
            },
            "& .MuiInputLabel-asterisk": {
              color: "#EF4444",
            },
            "& .MuiInputBase-input": {
              color: "#191919",
              "&::placeholder": {
                color: "#B2B2B2",
                opacity: 1,
              },
            },
            "& .MuiFormHelperText-root": {
              marginLeft: "12px",
              fontSize: "12px",
              "&.Mui-error": {
                color: "#EF4444",
              },
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
          fontSize: "14px",
          "& fieldset": {
            borderColor: "transparent",
          },
          "&:hover fieldset": {
            borderColor: "transparent",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#9CA3AF",
            borderWidth: "1px",
          },
          "&.Mui-error fieldset": {
            borderColor: "#EF4444",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#7F7F7F",
          fontWeight: 500,
          fontSize: "14px",
          "&.Mui-focused": {
            color: "#7F7F7F",
          },
          "&.Mui-error": {
            color: "#EF4444",
          },
        },
        "& .MuiInputLabel-asterisk": {
          color: "#EF4444",
        },
        "& .MuiInputBase-input": {
          color: "#191919",
          "&::placeholder": {
            color: "#B2B2B2",
            opacity: 1,
          },
        },
        "& .MuiFormHelperText-root": {
          marginLeft: "12px",
          fontSize: "12px",
          "&.Mui-error": {
            color: "#EF4444",
          },
        },
      }}
      {...props}
    />
  );
};

export default TextInput;
