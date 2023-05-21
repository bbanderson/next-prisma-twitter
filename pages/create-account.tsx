import React, { useCallback } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import useMutation from "../lib/client/useMutation";
import { useRouter } from "next/router";
import ROUTES from "src/routes";
import useRedirectInAuth from "@lib/client/useRedirectInAuth";
import Image from "next/image";
import { AuthInput } from "src/components/molecules/authInput";
import { useSWRConfig } from "swr";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

interface CreateAccountFormType {
  email?: string;
  name?: string;
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
  const { mutate } = useSWRConfig();
  useRedirectInAuth();
  const { register, handleSubmit, formState, watch, reset } =
    useForm<CreateAccountFormType>({
      mode: "onChange",
    });
  const [createAccount] = useMutation<
    CreateAccountDataType,
    CreateAccountFormType
  >(ROUTES.API_CREATE_ACCOUNT, {
    onCompleted: (data) => {
      if (data.createdUser) {
        toast.success("회원가입이 완료되었습니다!\n로그인을 해주세요!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        toast.onChange(() => {
          mutate(ROUTES.API_ME);
          router.push(ROUTES.LOG_IN);
        });
      } else if (data.error) {
        toast.error("이미 존재하는 이메일입니다.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        toast.onChange(() => {
          reset();
        });
      }
    },
    onError: (error) => {
      console.error(error);
      alert("회원가입을 할 수 없습니다. 관리자에게 문의해 주세요.");
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
        onSubmit={handleSubmit(onSubmit, onInvalid)}
        className="h-[10%] flex flex-col justify-between items-end"
      >
        <AuthInput type="email" formState={formState} register={register} />
        <AuthInput type="name" formState={formState} register={register} />
        <input
          type="submit"
          value="회원가입"
          className="w-full bg-blue-400 rounded-xl text-white mt-4 p-2 cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          disabled={!watch("email") || !watch("name")}
        />
        <Link href={ROUTES.LOG_IN}>
          <div className="text-blue-500 w-full text-center mt-3 cursor-pointer">
            이미 계정이 있으신가요? 로그인
          </div>
        </Link>
      </form>
    </div>
  );
};

export default CreateAccount;
