import useMutation from "@lib/client/useMutation";
import useUser from "@lib/client/useUser";
import { useRouter } from "next/router";
import ROUTES from "src/routes";

function Home() {
  const router = useRouter();
  const { profile } = useUser();
  const [logout] = useMutation(ROUTES.API_LOG_OUT, {
    onCompleted: (data) => {
      if (data.ok) {
        router.replace(ROUTES.LOG_IN);
      }
    },
    onError: console.error,
  });
  return (
    <div>
      {profile.id && (
        <div>
          {profile.name}님 안녕하세요
          <button onClick={() => logout()}>LogOut</button>
        </div>
      )}
    </div>
  );
}

export default Home;
