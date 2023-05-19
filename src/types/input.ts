import type { FormState, UseFormRegister } from "react-hook-form";

type AuthInputType = "email" | "name";
export type AuthInputFormType = Partial<{ [key in AuthInputType]: string }>;
export interface AuthInputPropType {
  type: AuthInputType;
  register: UseFormRegister<AuthInputFormType>;
  formState: FormState<AuthInputFormType>;
}
