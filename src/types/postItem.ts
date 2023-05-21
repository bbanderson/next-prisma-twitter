import { Post } from "@prisma/client";

export interface PostItemPropType {
  id?: number;
  authorId?: number;
  authorName?: string;
  imgSrc?: string | null;
  text?: string;
  isLiked?: boolean;
  createdAt?: string;
  likeCount?: number;
  commentCount?: number;
  onClickLike?(): void;
}

export interface PostRawType {
  ok: boolean;
  posts: (Post & {
    LikedPost: {
      userId: number;
    }[];
    user: {
      imgSrc: string | null;
      name: string;
      id: number;
    };
    _count: {
      LikedPost: number;
      Comment: number;
    };
  })[];
}
