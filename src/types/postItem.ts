export interface PostItemPropType {
  id?: number;
  authorName?: string;
  text?: string;
  isLiked?: boolean;
  createdAt?: string;
  likeCount?: number;
  commentCount?: number;
  onClickLike?(): void;
}
