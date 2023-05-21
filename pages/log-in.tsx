import useMutation from "@lib/client/useMutation";
import useRedirectInAuth from "@lib/client/useRedirectInAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthInput } from "src/components/molecules/authInput";
import ROUTES from "src/routes";
import { useSWRConfig } from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LogInFormType {
  email?: string;
}

const LogIn = () => {
  const router = useRouter();
  useRedirectInAuth();

  const { formState, handleSubmit, register, watch, reset } =
    useForm<LogInFormType>();
  const { mutate } = useSWRConfig();

  const [login, { loading }] = useMutation<LogInFormType>(ROUTES.API_LOG_IN, {
    onCompleted: (data) => {
      if (data.ok) {
        mutate(ROUTES.API_ME);
        mutate(ROUTES.API_POST);
        router.push(ROUTES.HOME);
      } else {
        toast.error(data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => {
            reset();
          },
        });
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
    <div className="absolute top-0 bottom-0 left-0 right-0 m-auto flex flex-col justify-center items-center w-screen h-screen bg-slate-100">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Image src={"/assets/twitter.png"} width={30} height={30} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[10%] flex flex-col justify-between"
      >
        <AuthInput type="email" formState={formState} register={register} />
        <input
          type="submit"
          value={loading ? "..." : "로그인"}
          disabled={!watch("email") || loading}
          className="w-full bg-blue-400 rounded-xl text-white mt-4 p-2 cursor-pointer"
        />
        <Link href={ROUTES.CREATE_ACCOUNT}>
          <div className="text-blue-500 w-full text-center mt-3 cursor-pointer">
            아직 계정이 없으신가요? 회원가입
          </div>
        </Link>
      </form>
    </div>
  );
};

export default LogIn;
