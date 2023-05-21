import { useSWRConfig } from "swr";
import useMutation from "./useMutation";
import ROUTES from "src/routes";
import { useRouter } from "next/router";

const useLogout = () => {
  const router = useRouter();
  const { mutate: mutateUnbound } = useSWRConfig();

  const [logout] = useMutation(ROUTES.API_LOG_OUT, {
    onCompleted: (data) => {
      if (data.ok) {
        mutateUnbound(ROUTES.API_ME);
        router.replace(ROUTES.LOG_IN);
      }
    },
    onError: console.error,
  });

  return { logout };
};

export default useLogout;
