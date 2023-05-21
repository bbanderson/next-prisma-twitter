import useMutation from "./useMutation";
import ROUTES from "src/routes";
import { KeyedMutator } from "swr";
import { PostRawType } from "src/types/postItem";

export const useToggleLike = ({
  mutate,
}: {
  mutate?: KeyedMutator<PostRawType>;
}) => {
  const [toggleLike] = useMutation<{ postId: number }>(ROUTES.API_POST_LIKE, {
    onCompleted: (data) => {
      if (data.ok) {
        mutate?.();
      }
    },
  });
  return { toggleLike };
};
