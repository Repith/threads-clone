import Image from "next/image";
import Link from "next/link";

import {
  formatDateString,
  timeSinceLastPost,
} from "@/lib/utils";

import DeleteThread from "@/app/components/forms/DeleteThread";
import EditThread from "@/app/components/forms/EditThread";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React from "react";
import { Button } from "@/components/ui/button";

import { userReaction } from "@/lib/actions/reaction.actions";
import ReactionButton from "../forms/ReactionButton";

interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    name: string;
    image: string;
    username: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  editedAt: string;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  reactionUserId: string;
  reactions: {
    user: string;
    thread: string;
  }[];
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  editedAt,
  reactionUserId,
  reactions,
}: ThreadCardProps) => {
  return (
    <>
      <article
        className={`flex w-full flex-col rounded-xl ${
          isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex w-full flex-1 flex-row gap-4">
            <div className="flex flex-col items-center">
              <Link
                href={`/profile/${author.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  src={author.image}
                  alt="user_community_image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>

              <div className="thread-card_bar" />
            </div>

            <div className="flex w-full flex-col">
              <Link
                href={`/profile/${author.id}`}
                className="w-fit"
                legacyBehavior
              >
                <div className="cursor-pointer text-base-semibold text-light-1">
                  <HoverCard>
                    <HoverCardTrigger>
                      {author.name}
                      {"  "}
                      <span className="text-sm text-light-4">
                        @{author.username}
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="max-w-2xl">
                      <div className="flex flex-row gap-2 px-6 pt-6 justify-between">
                        <div className="relative h-16 w-16 object-cover">
                          <Image
                            src={author.image}
                            alt="logo"
                            fill
                            className="rounded-full object-cover shadow-2xl"
                          />
                        </div>
                        <Button className="comment-form_btn">
                          Follow
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2 px-6 py-4">
                        <div className="flex-1 ">
                          <h2 className="text-left text-heading3-bold text-light-1">
                            {author.name}
                          </h2>
                          <p className="text-base-medium text-gray-1 -mt-2">
                            @{author.username}
                          </p>
                        </div>
                        {/* TODO Hardcoded for future implementation of follow utility */}
                        <p className="text-base-medium text-gray-1">
                          <span className="text-bold text-light-1">
                            7
                          </span>{" "}
                          Following
                          <span className="text-bold text-light-1 ml-4">
                            211
                          </span>{" "}
                          Followers
                        </p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>

                  <span className="text-sm text-light-4">
                    {" · "}
                    {timeSinceLastPost(createdAt)}
                  </span>
                </div>
              </Link>

              <p className="mt-2 text-small-regular text-light-2">
                {content}
              </p>

              {editedAt && (
                <p className="mt-2 text-subtle-medium text-gray-1 font-style: italic">
                  Last edit - {formatDateString(editedAt)}
                </p>
              )}

              <div
                className={`${
                  isComment && "mb-10"
                } mt-5 flex flex-col gap-3`}
              >
                <div className="flex gap-3 text-light-4 text-sm">
                  <div className="flex flex-row items-center hover:bg-slate-500 hover:bg-opacity-10 rounded-full px-2 py-1 ">
                    {reactions.length > 0 &&
                    reactions.some(
                      (reaction) =>
                        JSON.stringify(reaction.user) ===
                        JSON.stringify(reactionUserId)
                    ) ? (
                      <ReactionButton
                        key={id}
                        threadId={JSON.stringify(id)}
                        userId={JSON.stringify(
                          reactionUserId
                        )}
                        isReacted
                      />
                    ) : (
                      <ReactionButton
                        key={id}
                        threadId={JSON.stringify(id)}
                        userId={JSON.stringify(
                          reactionUserId
                        )}
                      />
                    )}
                    <p className="text-small-regular">
                      {reactions.length > 0 &&
                        reactions.length}
                    </p>
                  </div>

                  <Link
                    href={`/thread/${id}`}
                    className="flex flex-row items-center hover:bg-slate-500 hover:bg-opacity-10 rounded-full px-2 py-1 "
                  >
                    <Image
                      src="/assets/reply.svg"
                      alt="heart"
                      width={24}
                      height={24}
                      className="cursor-pointer object-contain"
                    />
                    <p className="text-small-regular">
                      {comments.length > 0 &&
                        comments.length}
                    </p>
                  </Link>
                  <Image
                    src="/assets/repost.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  <Image
                    src="/assets/share.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </div>

                {isComment && comments.length > 0 && (
                  <Link href={`/thread/${id}`}>
                    <p className="mt-1 text-subtle-medium text-gray-1">
                      {comments.length} repl
                      {comments.length > 1 ? "ies" : "y"}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <DeleteThread
            threadId={JSON.stringify(id)}
            currentUserId={currentUserId}
            authorId={author.id}
            parentId={parentId}
            isComment={isComment}
          />

          <EditThread
            threadId={JSON.stringify(id)}
            currentUserImg={author.image}
            currentUserId={currentUserId}
            authorId={author.id}
            content={content}
          />
        </div>

        {!isComment && comments.length > 0 && (
          <div className="ml-1 mt-3 flex items-start gap-2">
            {comments.slice(0, 2).map((comment, index) => (
              <div
                key={index}
                className="relative h-6 w-6 items-center"
              >
                <Image
                  key={index}
                  src={comment.author.image}
                  alt={`user_${index}`}
                  fill
                  className={`${
                    index !== 0 && "-ml-5"
                  } rounded-full object-cover`}
                />
              </div>
            ))}

            <Link href={`/thread/${id}`}>
              <p className="mt-1 text-subtle-medium text-gray-1 ">
                {comments.length} repl
                {comments.length > 1 ? "ies" : "y"}
              </p>
            </Link>
          </div>
        )}

        {!isComment && community && (
          <Link
            href={`/communities/${community.id}`}
            className="mt-5 flex items-center"
          >
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)}
              {community &&
                ` - ${community.name} Community`}
            </p>

            <Image
              src={community.image}
              alt={community.name}
              width={14}
              height={14}
              className="ml-1 rounded-full object-cover"
            />
          </Link>
        )}
      </article>
    </>
  );
};
export default ThreadCard;
