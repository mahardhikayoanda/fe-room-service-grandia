"use client";

import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";

import { getValueByPath } from "@/utils/index";

export interface RenderProps
  extends ControllerRenderProps<FieldValues, string> {
  error: boolean;
  helperText: string | undefined;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T, any, FieldValues>;
  render: ({
    error,
    helperText,
    name,
    onBlur,
    onChange,
    ref,
    value,
    disabled,
  }: RenderProps) => React.ReactElement;
}

const ControllWrapper = <T extends FieldValues>({
  name,
  control,
  render,
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, formState: { errors } }) =>
      render({
        ...field,
        error: !!getValueByPath(errors, name),
        helperText:
          (getValueByPath(errors, name)?.message as string) || undefined,
      })
    }
  />
);

export default ControllWrapper;
