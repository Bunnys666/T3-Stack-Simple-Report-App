"use-client";

import { FeaturesTitle } from "@/components/Section";
import { ActionsGrid } from "@/components/SectionReport";
import { Demo } from "@/components/Skeleton";
import { useSession } from "next-auth/react";
import Head from "next/head";
export default function Home() {
  const { data: sessionData } = useSession();
  const { data: session, status } = useSession();
  const sessions = useSession();

  if (status === "loading") {
    return <Demo />;
  }
  if (status === "authenticated") {
    return (
      <div className="flex h-full w-auto justify-center">
        <ActionsGrid />
      </div>
    );
  }
  if (sessions.data?.user.role === "admin") {
    return (
      <div className="">
        <h1>hellow admin</h1>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h2>
        <span>
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </span>
      </h2>

      <div className="flex h-full w-auto justify-center">
        <FeaturesTitle />
      </div>
    </>
  );
}