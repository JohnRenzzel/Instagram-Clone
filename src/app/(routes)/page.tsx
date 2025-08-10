import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();

  // If no session, show login button immediately
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoginButton />
      </div>
    );
  }

  // If session exists, show UserHome with loading state
  return (
    <div className="">
      <Suspense fallback={<Preloader />}>
        <UserHome session={session} />
      </Suspense>
    </div>
  );
}
