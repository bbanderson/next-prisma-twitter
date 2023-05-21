import React from "react";
import { PostItemPropType } from "src/types/postItem";

const PostItem = ({
  authorName,
  text,
  isLiked,
  createdAt,
  likeCount,
  commentCount,
  onClickLike,
}: PostItemPropType) => {
  return (
    <div
      className="p-2 flex relative hover:bg-slate-50
"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer absolute top-2 right-2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
        />
      </svg>
      <div className="rounded-full bg-slate-200 w-14 h-14" />
      <div className="flex flex-col ml-5 flex-1">
        <div>
          <span className="font-semibold">{authorName}</span>
          <span className="text-gray-400 mx-1">@{authorName}</span>
          <span className="text-gray-400 mx-0.2">
            <span className="mr-1">·</span>
            {createdAt}
          </span>
        </div>
        <div className="text-xl mt-1 text-gray-900">{text}</div>
        <div className="mt-5 flex justify-between items-center">
          <button
            className="flex justify-center items-center m-auto w-full space-x-3 group [&>*]:transition-all duration-100"
            onClick={onClickLike}
          >
            {isLiked ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 stroke-pink-500 fill-pink-500"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
                <span className="text-pink-500">{likeCount}</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 group-hover:stroke-pink-500 group-hover:bg-gray-100 group-hover:rounded-full group-hover:p-[0.125rem] group-hover:w-6 group-hover:h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="group-hover:text-pink-500">{likeCount}</span>
              </>
            )}
          </button>
          <button className="flex justify-center items-center m-auto w-full space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <span>{commentCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
