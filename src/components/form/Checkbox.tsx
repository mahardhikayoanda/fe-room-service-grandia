"use client";

import { FormControlLabel } from "@mui/material";
import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import type { Control, FieldValues, Path } from "react-hook-form";

import ControllWrapper from "./FormControlWrapper";
import { cn } from "@/utils";

export interface CheckboxProps<T extends FieldValues> extends MuiCheckboxProps {
  name?: Path<T>;
  control?: Control<T>; // Konsisten dengan ControllWrapper
  label?: string;
  manipulate?: (value: boolean) => boolean | string | number;
  isChecked?: (value: boolean | string | number) => boolean;
  disableDeselect?: boolean;
}

const Checkbox = <T extends FieldValues>({
  label,
  name,
  control,
  className,
  manipulate,
  isChecked,
  disableDeselect,
  ...props
}: CheckboxProps<T>) => {
  return control && name ? (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ value, onChange, error, helperText, ...field }) => (
        <div className="flex flex-col">
          <FormControlLabel
            label={label}
            className="-ml-2"
            control={
              <MuiCheckbox
                className={cn(className)}
                checked={isChecked ? isChecked(value) : !!value}
                {...field}
                onChange={(e) => {
                  if (disableDeselect && !e.target.checked) {
                    return;
                  }

                  onChange({
                    ...e,
                    target: {
                      value: manipulate?.(e.target.checked) ?? e.target.checked,
                    },
                  });
                }}
                {...props}
              />
            }
          />
          {/* Tampilkan error message jika ada */}
          {error && helperText && (
            <div className="text-red-500 text-xs ml-2 mt-0.5">{helperText}</div>
          )}
        </div>
      )}
    />
  ) : (
    <FormControlLabel
      label={label}
      className="!gap-0"
      control={<MuiCheckbox className={cn("", className)} {...props} />}
    />
  );
};

export default Checkbox;
