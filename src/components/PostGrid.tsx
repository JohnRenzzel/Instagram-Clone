"use client";
import { Post } from "@prisma/client";
import Link from "next/link";
import Masonry from "react-masonry-css";

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          860: 3,
          500: 2,
        }}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {posts.map((post) => (
          <Link href={`/posts/${post.id}`} className="mb-4 block" key={post.id}>
            <img alt="Images" className="rounded-lg" src={post.image} />
          </Link>
        ))}
      </Masonry>
    </div>
  );
}
