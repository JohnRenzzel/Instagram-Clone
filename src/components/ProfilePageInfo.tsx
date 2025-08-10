"use client";
import FollowButton from "@/components/FollowButton";
import { Follower, Profile } from "@/generated/prisma";
import { CheckIcon, ChevronLeft, CogIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePageInfo({
  profile,
  isOurProfile,
  ourFollow,
}: {
  profile: Profile;
  isOurProfile: boolean;
  ourFollow: Follower | null;
}) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <section className="flex justify-between items-center">
        <button className="cursor-pointer" onClick={handleBack}>
          <ChevronLeft />
        </button>
        <div className="font-bold flex items-center gap-2">
          {profile.username}
          <div className="size-5 rounded-full bg-igRed inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </div>
        <div>
          {isOurProfile && (
            <Link href="/settings">
              <CogIcon />
            </Link>
          )}
        </div>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-igOrange to-igRed">
          <div className="size-44 p-2 bg-white dark:bg-black rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
              <img
                className=""
                src={
                  profile.avatar ??
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Avatar"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 mt-1 mb-1">{profile.subtitle}</p>
        <p className="">{profile.bio}</p>
      </section>
      {!isOurProfile && (
        <section className="flex justify-center my-3">
          <FollowButton ourFollow={ourFollow} profileIdToFollow={profile.id} />
        </section>
      )}
    </div>
  );
}
