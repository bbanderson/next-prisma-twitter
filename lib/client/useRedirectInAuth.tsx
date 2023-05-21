import { useEffect } from "react";
import useUser from "./useUser";
import { useRouter } from "next/router";
import ROUTES from "src/routes";

const useRedirectInAuth = () => {
  const router = useRouter();

  const { profile } = useUser({
    redirectUrl:
      router.pathname === ROUTES.CREATE_ACCOUNT
        ? ROUTES.CREATE_ACCOUNT
        : ROUTES.LOG_IN,
  });

  useEffect(() => {
    if (profile?.id) {
      router.replace(ROUTES.HOME);
    }
  }, [profile, router]);
};

export default useRedirectInAuth;
