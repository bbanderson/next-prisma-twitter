import { usePostItemProps } from "@lib/client/usePostItemProps";
import useUser from "@lib/client/useUser";
import { useRouter } from "next/router";
import React from "react";
import PostItem from "src/components/molecules/postItem";
import ROUTES from "src/routes";
import useSWR from "swr";

const Post = () => {
  const router = useRouter();
  const { profile } = useUser();

  const { data } = useSWR(
    router.query.id ? `${ROUTES.API_POST}/${router.query.id}` : null
  );

  const { getPostItemProps } = usePostItemProps({ userId: profile.id });

  return (
    <div>
      <PostItem {...getPostItemProps(data?.post)} />
    </div>
  );
};

export default Post;
