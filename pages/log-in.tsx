import useMutation from "@lib/client/useMutation";
import useUser from "@lib/client/useUser";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInput } from "src/components/molecules/authInput";
import ROUTES from "src/routes";

interface LogInFormType {
  email?: string;
}

const LogIn = () => {
  const router = useRouter();
  const { formState, handleSubmit, register } = useForm<LogInFormType>();

  const [login, { loading }] = useMutation<LogInFormType>(ROUTES.API_LOG_IN, {
    onCompleted: (data) => {
      if (data.ok) {
        router.push(ROUTES.HOME);
      } else {
        alert(data.message);
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<LogInFormType> = useCallback(({ email }) => {
    login({ email });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AuthInput type="email" formState={formState} register={register} />
      <input
        type="submit"
        value={loading ? "..." : "로그인"}
        disabled={loading}
      />
    </form>
  );
};

export default LogIn;
