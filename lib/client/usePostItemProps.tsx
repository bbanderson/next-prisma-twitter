import { Post } from "@prisma/client";
import dayjs from "dayjs";
import { useCallback } from "react";
import { PostItemPropType } from "src/types/postItem";

type PostRawType = Post & {
  LikedPost: {
    userId: number;
  }[];
  user: {
    name: string;
    id: number;
  };
  _count: {
    LikedPost: number;
    Comment: number;
  };
};

interface usePostItemPropsInterface {
  post?: PostRawType;
  userId?: number;
  onClickLike?(): void;
}

export const usePostItemProps = ({
  userId,
  onClickLike,
}: usePostItemPropsInterface) => {
  const getPostItemProps = useCallback(
    (post: usePostItemPropsInterface["post"]): PostItemPropType | null =>
      post
        ? {
            id: post?.id,
            authorName: post?.user.name,
            text: post?.text,
            isLiked: !!post?.LikedPost.find((liker) => liker.userId === userId),
            likeCount: post?._count.LikedPost,
            commentCount: post?._count.Comment,
            createdAt: dayjs(post?.createdAt).format("M월 DD일"),
            onClickLike,
          }
        : null,
    []
  );

  return {
    getPostItemProps,
  };
};
