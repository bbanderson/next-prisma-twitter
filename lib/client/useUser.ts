import { User } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import ROUTES from "src/routes";
import useSWR from "swr";

const useUser = ({
  redirectUrl = ROUTES.LOG_IN,
}: { redirectUrl?: string } = {}) => {
  const router = useRouter();

  const { data, error, isValidating } = useSWR<{
    ok: boolean;
    userSessionData?: User;
  }>(ROUTES.API_ME);

  const loading = useMemo(() => !data && !error, [data, error]);

  useEffect(() => {
    if (loading || isValidating) return;
    if (!data?.userSessionData?.id) {
      router.replace(redirectUrl);
    }
  }, [loading, isValidating, data, router.pathname, redirectUrl]);

  return { loading, profile: { ...data?.userSessionData } };
};

export default useUser;
