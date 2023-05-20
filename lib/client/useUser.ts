import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ROUTES from "src/routes";
import useSWR from "swr";

const useUser = () => {
  const router = useRouter();

  const { data } = useSWR<{ ok: boolean; userSessionData?: User }>(
    ROUTES.API_ME
  );

  useEffect(() => {
    if (data?.ok && !data.userSessionData) {
      router.replace(ROUTES.LOG_IN);
    }
  }, []);

  return { profile: { ...data?.userSessionData } };
};

export default useUser;
