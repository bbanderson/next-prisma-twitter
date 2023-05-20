import useUser from "@lib/client/useUser";
import { useRouter } from "next/router";
import React from "react";

function Home() {
  const { profile } = useUser();
  return <div>{JSON.stringify(profile)}</div>;
}

export default Home;
