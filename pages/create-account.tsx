import React, { useCallback } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import ROUTES from "src/routes";

interface CreateAccountFormType {
  email: string;
  name: string;
}
interface CreateAccountDataType {
  ok: boolean;
  createdUser?: {
    id: number;
    email: string;
    name: string;
  };
}
const CreateAccount = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<CreateAccountFormType>({ mode: "onChange" });
  const [createAccount] = useMutation<
    CreateAccountDataType,
    CreateAccountFormType
  >(ROUTES.API_CREATE_ACCOUNT, {
    onCompleted: (data) => {
      alert("회원가입이 완료되었습니다! 로그인을 해주세요!");
      if (data.createdUser) {
        router.push(ROUTES.LOG_IN);
      }
    },
    onError: (error) => {
      console.error(error);
      alert("회원가입에 실패하였습니다.");
    },
  });

  const onSubmit: SubmitHandler<CreateAccountFormType> = useCallback(
    (payload) => {
      createAccount(payload);
    },
    []
  );
  const onInvalid: SubmitErrorHandler<CreateAccountFormType> = useCallback(
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
            {formErrors.email?.type === "email" &&
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
            {formErrors.name?.type === "name" &&
              "닉네임 형식이 올바르지 않습니다."}
          </span>
        </label>
        <input type="submit" value="Create Account" />
      </form>
    </div>
  );
};

export default CreateAccount;
