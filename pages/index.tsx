import { useRouter } from "next/router";
import React from "react";

function Home() {
  const router = useRouter();
  return <div>{JSON.stringify(router.query)}</div>;
}

export default Home;
