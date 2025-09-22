import React from "react";

import TextField, { type TextFieldProps } from "@mui/material/TextField";

import type { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/utils/index";

import ControllWrapper from "./FormControlWrapper";

interface Props<T extends FieldValues>
  extends Omit<TextFieldProps, "outlined"> {
  name?: Path<T>;
  control?: Control<T, any, FieldValues>;
  // helperText?: string;
  manipulate?: (value: string) => string | number;
}

const TextInput = <T extends FieldValues>({
  placeholder,
  name,
  control,
  manipulate,
  className,
  helperText,
  ...props
}: Props<T>) =>
  control ? (
    <ControllWrapper<T>
      name={name as Path<T>}
      control={control}
      render={({ onChange, ...field }) => (
        <TextField
          hiddenLabel
          className={cn(props.hidden && "hidden", className)}
          placeholder={placeholder}
          onChange={(e) =>
            onChange({
              ...e,
              target: { value: manipulate?.(e.target.value) ?? e.target.value },
            })
          }
          {...field}
          {...props}
          helperText={field.error ? field.helperText : helperText}
        />
      )}
    />
  ) : (
    <TextField hiddenLabel placeholder={placeholder} {...props} />
  );

export default TextInput;
