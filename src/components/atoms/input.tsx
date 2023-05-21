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
    <div ref={ref} className="h-5 p-5 relative">
      <label className="h-[48px] flex justify-center items-center">
        <span>{label}</span>
        <input
          {...useFormProps}
          className="block rounded-xl mx-1 px-1 focus:outline-none flex-1 h-10"
        />
      </label>
      <div className="absolute -bottom-1 text-pink-500">{errorMessage}</div>
    </div>
  );
};

const InputForwarded = React.forwardRef<HTMLDivElement, InputPropType>(Input);
export { InputForwarded as Input };
