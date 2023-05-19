import { Input } from "../atoms/input";
import { EMAIL_REGEX, NAME_REGEX } from "src/constants";
import type { AuthInputPropType } from "src/types/input";

export const AuthInput = ({
  type,
  register,
  formState: { errors: formErrors },
}: AuthInputPropType) => {
  const locale = type === "email" ? "이메일" : "이름";
  const errorMessage = `${locale} 형식이 올바르지 않습니다.`;

  return (
    <Input
      label={`${locale} : `}
      useFormProps={register(type, {
        required: `${type}을 입력하세요`,
        validate: {
          [type]: (str) =>
            str &&
            new RegExp(type === "email" ? EMAIL_REGEX : NAME_REGEX).test(str),
        },
      })}
      errorMessage={formErrors[type]?.type === type ? errorMessage : undefined}
    />
  );
};
