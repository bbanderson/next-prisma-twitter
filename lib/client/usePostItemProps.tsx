import dayjs from "dayjs";
import { useCallback } from "react";
import { PostItemPropType, PostRawType } from "src/types/postItem";

interface usePostItemPropsInterface {
  post?: PostRawType["posts"][0];
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
            imgSrc: post.user.imgSrc,
            text: post?.text,
            isLiked: !!post?.LikedPost.find((liker) => liker.userId === userId),
            likeCount: post?._count.LikedPost,
            commentCount: post?._count.Comment,
            createdAt: dayjs(post?.createdAt).format("M월 DD일"),
            onClickLike,
          }
        : null,
    [userId]
  );

  return {
    getPostItemProps,
  };
};
