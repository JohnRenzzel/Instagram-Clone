import { auth, signIn, signOut } from "@/auth";
import LoginButton from "@/components/LoginButton";
import Preloader from "@/components/Preloader";
import UserHome from "@/components/UserHome";
import { Suspense } from "react";

export default async function Home() {
  const session = await auth();
  return (
    <div className="">
      {session && (
        <Suspense fallback={<Preloader />}>
          <UserHome session={session} />
        </Suspense>
      )}
      {!session && <LoginButton />}
    </div>
  );
}
