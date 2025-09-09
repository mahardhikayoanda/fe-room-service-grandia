"use client";

import type React from "react";

import { Card, CardContent, FormControlLabel } from "@mui/material";
import MuiCheckbox, {
  type CheckboxProps as MuiCheckboxProps,
} from "@mui/material/Checkbox";
import type { Control, FieldValues, Path } from "react-hook-form";

import ControllWrapper from "./FormControlWrapper";
import { cn } from "@/utils";

export interface CheckboxCardProps<T extends FieldValues>
  extends Omit<MuiCheckboxProps, "name"> {
  name: Path<T>;
  control: Control<T>;
  label?: React.ReactNode;
  manipulate?: (value: boolean) => boolean | string | number;
  isChecked?: (value: boolean | string | number) => boolean;
  disableDeselect?: boolean;
  cardClassName?: string;
}

const CheckboxCard = <T extends FieldValues>({
  label,
  name,
  control,
  className,
  cardClassName,
  manipulate,
  isChecked,
  disableDeselect,
  ...props
}: CheckboxCardProps<T>) => {
  return (
    <ControllWrapper<T>
      name={name}
      control={control}
      render={({ value, onChange, error, helperText, ...field }) => (
        <div className="flex flex-col">
          <Card
            className={cn(
              "border-2 transition-colors cursor-pointer hover:border-primary-300",
              error
                ? "border-red-300"
                : value
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-200",
              cardClassName
            )}
            onClick={() => {
              if (disableDeselect && value) return;

              const newValue = manipulate ? manipulate(!value) : !value;
              onChange({
                target: { value: newValue },
                type: "change",
              } as any);
            }}
          >
            <CardContent className="p-4">
              <FormControlLabel
                label={label}
                className="m-0 w-full"
                control={
                  <MuiCheckbox
                    className={cn(className)}
                    checked={isChecked ? isChecked(value) : !!value}
                    {...field}
                    onChange={(e) => {
                      if (disableDeselect && !e.target.checked) {
                        return;
                      }

                      const newValue =
                        manipulate?.(e.target.checked) ?? e.target.checked;
                      onChange({
                        ...e,
                        target: {
                          value: newValue,
                        },
                      });
                    }}
                    {...props}
                  />
                }
              />
            </CardContent>
          </Card>
          {/* Tampilkan error message jika ada */}
          {error && helperText && (
            <div className="text-red-500 text-xs mt-1">{helperText}</div>
          )}
        </div>
      )}
    />
  );
};

export default CheckboxCard;
