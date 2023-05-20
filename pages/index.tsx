import useMutation from "@lib/client/useMutation";
import useUser from "@lib/client/useUser";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ROUTES from "src/routes";

interface TweetForm {
  tweet: string;
}

function Home() {
  const router = useRouter();

  const { loading, profile } = useUser();

  const [logout] = useMutation(ROUTES.API_LOG_OUT, {
    onCompleted: (data) => {
      if (data.ok) {
        router.replace(ROUTES.LOG_IN);
      }
    },
    onError: console.error,
  });

  const { register, handleSubmit } = useForm<TweetForm>();
  const [postTweet] = useMutation(ROUTES.API_TWEET);

  return (
    <div className="flex">
      <aside className="flex flex-col justify-center group-[]:">
        {profile.id && (
          <div className="flex flex-col justify-between w-20 h-screen px-3">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 m-auto my-5 hover:bg-gray-200 hover:rounded-full hover:transition-all duration-100 p-2 cursor-pointer"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 m-auto my-5 hover:bg-gray-200 hover:rounded-full hover:transition-all duration-100 p-2 cursor-pointer"
              >
                <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                <path
                  fill-rule="evenodd"
                  d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 m-auto my-5 hover:bg-gray-200 hover:rounded-full hover:transition-all duration-100 p-2 cursor-pointer"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-12 h-12 m-auto my-5 hover:bg-gray-200 hover:rounded-full hover:transition-all duration-100 p-2 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <button onClick={() => logout()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 m-auto my-5 hover:bg-gray-200 hover:rounded-full hover:transition-all duration-100 p-2 cursor-pointer"
              >
                <path
                  fill-rule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </aside>
      <main className="py-4 w-full border-x-[1px] ">
        <h1 className="p-4 text-gray-900 text-xl font-bold">홈</h1>
        <form
          className="p-5 text-xl flex flex-col border-b-[1px]"
          onSubmit={handleSubmit((data) => {})}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
          <textarea
            className="peer w-full h-fit border-none resize-none text-gray-500 focus:placeholder:text-black focus:border-none focus:outline-none text-black"
            placeholder={
              loading ? "" : `${profile.name}님 무슨 일이 일어나고 있나요?`
            }
            maxLength={140}
            {...register("tweet")}
          ></textarea>
          <div className="flex flex-row-reverse peer-placeholder-shown:last-of-type:pointer-events-none peer-placeholder-shown:last-of-type:opacity-50 select-none">
            <button
              type="submit"
              className="max-w-fit text-white font-bold bg-blue-500 px-5 py-2 rounded-full"
            >
              트윗하기
            </button>
          </div>
        </form>
      </main>
      <aside className="hidden lg:block w-[500px] h-screen"></aside>
    </div>
  );
}

export default Home;
