"use client";

import type React from "react";

import { getValueByPath } from "@/utils";
import {
  type Control,
  Controller,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface RenderProps<T extends FieldValues = FieldValues>
  extends ControllerRenderProps<T, Path<T>> {
  error: boolean;
  helperText: string | undefined;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  render: (props: RenderProps<T>) => React.ReactElement;
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
