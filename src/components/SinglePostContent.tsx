import { Suspense } from "react";
import SessionCommentForm from "@/components/SessionCommentForm";
import Comment from "@/components/Comment";
import LikesInfo from "@/components/LikesInfo";
import {
  Bookmark,
  Comment as CommentModel,
  Like,
  Post,
  Profile,
} from "@prisma/client";
import Preloader from "./Preloader";
import BookmarkButton from "./BookmarkButton";

export default function SinglePostContent({
  post,
  authorProfile,
  comments,
  commentsAuthor,
  myLike,
  myBookmark,
}: {
  post: Post;
  authorProfile: Profile;
  comments: CommentModel[];
  commentsAuthor: Profile[];
  myLike: Like | null;
  myBookmark: Bookmark | null;
}) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <img className="rounded-md" src={post.image} alt={post.description} />
        </div>
        <div>
          <Comment
            createdAt={post.createdAt}
            text={post.description}
            authorProfile={authorProfile}
          />
          <div className="pt-4 flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment.id}>
                <Comment
                  createdAt={comment.createdAt}
                  text={comment.text}
                  authorProfile={commentsAuthor.find(
                    (a) => a.email === comment.author
                  )}
                />
              </div>
            ))}
          </div>
          <div className="flex text-gray-700 dark:text-gray-400 items-center gap-2 justify-between py-4 mt-4 border-t border-gray-300 dark:border-gray-700">
            <LikesInfo post={post} sessionLike={myLike} />
            <div className="flex items-center">
              <BookmarkButton post={post} sessionBookmark={myBookmark} />
            </div>
          </div>
          <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
            <Suspense
              fallback={
                <div className="flex justify-center items-center py-4">
                  <Preloader />
                </div>
              }
            >
              <SessionCommentForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
