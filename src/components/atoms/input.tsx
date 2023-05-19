import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputPropType {
  label: string;
  useFormProps: UseFormRegisterReturn;
  errorMessage?: string;
}
const Input = (
  { label, useFormProps, errorMessage }: InputPropType,
  ref?: React.ForwardedRef<HTMLDivElement>
) => {
  return (
    <div ref={ref}>
      <label>
        <span>{label}</span>
        <input {...useFormProps} />
      </label>
      <span>{errorMessage}</span>
    </div>
  );
};

const InputForwarded = React.forwardRef<HTMLDivElement, InputPropType>(Input);
export { InputForwarded as Input };
