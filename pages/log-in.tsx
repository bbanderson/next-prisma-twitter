import useMutation from "@lib/client/useMutation";
import useRedirectInAuth from "@lib/client/useRedirectInAuth";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInput } from "src/components/molecules/authInput";
import ROUTES from "src/routes";
import { useSWRConfig } from "swr";

interface LogInFormType {
  email?: string;
}

const LogIn = () => {
  const router = useRouter();
  useRedirectInAuth();

  const { formState, handleSubmit, register } = useForm<LogInFormType>();
  const { mutate } = useSWRConfig();

  const [login, { loading }] = useMutation<LogInFormType>(ROUTES.API_LOG_IN, {
    onCompleted: (data) => {
      if (data.ok) {
        mutate(ROUTES.API_ME);
        mutate(ROUTES.API_POST);
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
