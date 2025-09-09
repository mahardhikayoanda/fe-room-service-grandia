"use client";

import { SyntheticEvent, useEffect } from "react";

import { InputProps, TextField, TextFieldProps } from "@mui/material";
import MuiAutocomplete, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";

import { Control, FieldValues, Path } from "react-hook-form";

import ControllWrapper from "./FormControlWrapper";
import { cn } from "@/utils";

export interface AutocompleteOptionsType {
  label: string;
  value: string;
}

interface Props<T extends FieldValues>
  extends Omit<
    AutocompleteProps<AutocompleteOptionsType, boolean, boolean, boolean>,
    "renderInput"
  > {
  renderInputProps?: TextFieldProps;
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  renderInput?: AutocompleteProps<
    AutocompleteOptionsType,
    boolean,
    boolean,
    boolean
  >["renderInput"];
}

interface BaseProps
  extends AutocompleteProps<
    AutocompleteOptionsType,
    boolean,
    boolean,
    boolean
  > {
  onControllerChange: (...event: any[]) => void;
}

const BaseAutoComplete = ({
  options,
  renderInput,
  slotProps,
  onChange,
  onControllerChange,
  value,
  readOnly,
  ...props
}: BaseProps) => {
  const getValue = (v: any | any[]) => {
    if (Array.isArray(v) || props.multiple) {
      return options.filter((option) => v.includes(option.value)) || [];
    }
    return (
      options.find(
        (option) => option.value === (typeof v === "string" ? v : v?.value)
      ) || null
    );
  };

  useEffect(() => {
    if (options.length === 0 && !props.loading) {
      if (Array.isArray(value)) {
        onControllerChange([]);
        onChange?.({} as SyntheticEvent, [], "selectOption");
      } else {
        onControllerChange("");
        onChange?.({} as SyntheticEvent, "", "selectOption");
      }
    }
  }, [options.length]);

  return (
    <MuiAutocomplete
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.label || ""
      }
      renderInput={renderInput}
      isOptionEqualToValue={(option, val) =>
        typeof val === "string"
          ? option.value === val
          : option.value === val.value
      }
      onChange={(event, val, ...rest) => {
        const typedVal = val as
          | AutocompleteOptionsType
          | AutocompleteOptionsType[]
          | null;

        if (Array.isArray(typedVal)) {
          onControllerChange(typedVal.map((d) => d.value));
          onChange?.(
            event,
            typedVal.map((d) => d.value),
            ...rest
          );
        } else if (typeof typedVal === "object" && typedVal !== null) {
          onControllerChange(typedVal.value);
          onChange?.(event, typedVal.value, ...rest);
        } else {
          onControllerChange(null);
          onChange?.(event, null, ...rest);
        }
      }}
      value={getValue(value)}
      slotProps={{
        chip: {
          className: "max-w-52 truncate mr-1",
        },
        ...slotProps,
      }}
      popupIcon={readOnly ? null : props.popupIcon}
      readOnly={readOnly}
      {...props}
    />
  );
};

const AutoCompleteInput = <T extends FieldValues>({
  renderInputProps = {},
  renderInput,
  name,
  control,
  placeholder,
  ...props
}: Props<T>) => {
  return (
    <ControllWrapper
      name={name}
      control={control}
      render={({ onChange, error, helperText, ...field }) => {
        const defaultRenderInput = ({
          inputProps,
          ...params
        }: AutocompleteRenderInputParams) => {
          return (
            <TextField
              error={error}
              helperText={helperText}
              {...params}
              {...renderInputProps}
              className={cn(
                props.readOnly && "MuiInputBase-readOnly",
                renderInputProps.className
              )}
              inputProps={{
                ...inputProps,
                readOnly: props.readOnly,
                placeholder: placeholder,
              }}
              sx={{
                height: 48,
                "& .MuiInputBase-root": {
                  height: 48,
                  borderRadius: "8px",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: 48,
                  "& fieldset": {
                    borderColor: "#8f8f8f",
                    borderRadius: "8px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#999999",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1976d2",
                  },
                },
                ...renderInputProps.sx,
              }}
            />
          );
        };

        return (
          <BaseAutoComplete
            {...props}
            {...field}
            renderInput={renderInput || defaultRenderInput}
            onControllerChange={onChange}
          />
        );
      }}
    />
  );
};

export default AutoCompleteInput;
