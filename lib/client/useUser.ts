import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import ROUTES from "src/routes";
import useSWR from "swr";

const useUser = () => {
  const router = useRouter();

  const { data, isValidating, error } = useSWR<{
    ok: boolean;
    userSessionData?: User;
  }>(ROUTES.API_ME);

  const loading = useMemo(() => !data && !error, []);

  useEffect(() => {
    if (loading) return;
    if (isValidating && !data?.ok) {
      router.replace(ROUTES.LOG_IN);
    }
  }, [router.pathname]);

  return { loading, profile: { ...data?.userSessionData } };
};

export default useUser;
