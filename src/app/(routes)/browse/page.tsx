import PostGrid from "@/components/PostGrid";
import { prisma } from "@/db";

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return (
    <div>
      {/* <div className="mb-4">
        <h1 className="text-xl 4-xl text-slate-900 font-bold">Browse</h1>
        <p className="text-gray-500">Check posts and Trending</p>
      </div> */}
      <PostGrid posts={posts} />
    </div>
  );
}
