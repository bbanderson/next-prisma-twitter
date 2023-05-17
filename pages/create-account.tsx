import React, { useCallback } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

interface CreateAccountType {
  email: string;
  name: string;
}
const CreateAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CreateAccountType>({ mode: "onChange" });

  const onSubmit: SubmitHandler<CreateAccountType> = useCallback((data) => {
    console.log(data);
  }, []);
  const onInvalid: SubmitErrorHandler<CreateAccountType> = useCallback(
    (error) => {
      console.error(error);
    },
    []
  );
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <label>
          <span>Email : </span>
          <input
            {...register("email", {
              required: "이메일을 입력하세요",
              validate: {
                email: (str) =>
                  new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(str),
              },
            })}
          />
          <span>
            {formErrors.email?.type === "notEmail" &&
              "이메일 형식이 올바르지 않습니다."}
          </span>
        </label>
        <label>
          <span>Name : </span>
          <input
            {...register("name", {
              required: "닉네임을 입력하세요",
              validate: {
                name: (str) =>
                  new RegExp(
                    /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g
                  ).test(str),
              },
            })}
          />
          <span>
            {formErrors.name?.type === "notName" &&
              "닉네임 형식이 올바르지 않습니다."}
          </span>
        </label>
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
};

export default CreateAccount;
