import { prisma } from "@/db";
import { Follower } from "@/generated/prisma";
import { Avatar } from "@radix-ui/themes";
import { Profile } from "next-auth";
import LikesInfo from "./LikesInfo";
import { getSessionEmailOrThrow } from "@/actions";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export default async function HomePosts({ profiles }: { profiles: Profile[] }) {
  const post = await prisma.post.findMany({
    where: {
      author: {
        in: profiles
          .map((p) => p.email)
          .filter((email): email is string => typeof email === "string"),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });
  const likes = await prisma.like.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: post.map((p) => p.id) },
    },
  });
  const bookmark = await prisma.bookmark.findMany({});
  return (
    <div className="max-w-md mx-auto flex flex-col gap-8 ">
      {post.map((post) => {
        const profile = profiles.find((p) => p.email === post.author);
        return (
          <div className="" key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <img
                className="block rounded-lg shadow-md shadow-black/50"
                src={post.image}
                alt=""
              />
            </Link>

            <div className="flex items-center gap-2 mt-4 justify-between">
              <div className="flex gap-2 items-center">
                <Avatar
                  radius="full"
                  src={
                    typeof profile?.avatar === "string" ? profile.avatar : ""
                  }
                  fallback="avatar"
                  size="2"
                />
                <Link
                  className="font-bold text-gray-700"
                  href={`/users/${profile?.username}`}
                >
                  {profile?.name}
                </Link>
              </div>

              <div className="flex gap-2 items-center">
                <LikesInfo
                  post={post}
                  showText={false}
                  sessionLike={
                    likes.find((like) => like.postId === post.id) || null
                  }
                />
                <BookmarkButton
                  post={post}
                  sessionBookmark={
                    bookmark.find((b) => b.postId === post.id) || null
                  }
                />
              </div>
            </div>
            <p className="mt-2 text-gray-600">{post.description}</p>
          </div>
        );
      })}
    </div>
  );
}
