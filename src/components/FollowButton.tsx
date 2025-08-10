"use client";
import { followProfile, unfollowProfile } from "@/actions";
import { Follower } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { UserMinusIcon, UserPlus2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FollowButton({
  profileIdToFollow,
  ourFollow = null,
}: {
  profileIdToFollow: string;
  ourFollow: Follower | null;
}) {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState(!!ourFollow);
  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        if (isFollowed) {
          await unfollowProfile(profileIdToFollow);
        } else {
          //follow
          await followProfile(profileIdToFollow);
        }
        router.refresh();
      }}
    >
      <Button
        size="3"
        className={
          isFollowed
            ? "!bg-gradient-to-tr to-violet from-0% from-igRed to-80%"
            : "!bg-gradient-to-tr from-igOrange from-0% to-igRed to-80%"
        }
      >
        {isFollowed ? <UserMinusIcon /> : <UserPlus2Icon />}
        {isFollowed ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
}
