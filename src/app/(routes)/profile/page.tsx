import { auth } from "@/auth";
import PostGrid from "@/components/PostGrid";
import ProfilePosts from "@/components/ProfilePosts";
import { prisma } from "@/db";
import { CheckIcon, ChevronLeft, Cog } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProfilePage() {
  const session = await auth();
  const profile = await prisma.profile.findFirstOrThrow({
    where: {
      email: session?.user?.email as string,
    },
  });
  return (
    <main>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <div className="font-bold flex items-center gap-2">
          {profile.username || ""}
          <div className="size-5 rounded-full bg-igRed inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </div>
        <Link href={"/settings"}>
          <Cog />
        </Link>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 bg-gradient-to-tr from-igOrange to-igRed rounded-full">
          <div className="size-44 p-2 bg-white rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
              <img
                className=""
                src={
                  profile.avatar ??
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" ??
                  undefined
                }
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name || ""}</h1>
        <p className="text-gray-500 mt-1 mb-1">{profile.subtitle || ""}</p>
        <p>{profile.bio || ""}</p>
      </section>
      <section className="mt-4">
        <div className="flex justify-center gap-4 font-bold">
          <Link href={""}>Post</Link>
          <Link className="text-gray-400" href={"/highlights"}>
            Highlights
          </Link>
        </div>
      </section>
      <section className="mt-4">
        <Suspense fallback="Loading...">
          <ProfilePosts email={profile.email} />
        </Suspense>
      </section>
    </main>
  );
}
