"use client";

import Image from "next/image";

import { userReaction } from "@/lib/actions/reaction.actions";
import { Button } from "@/components/ui/button";

interface ReactionButtonProps {
  threadId: string;
  authorId: string;
}

const ReactionButton = ({
  threadId,
  authorId,
}: ReactionButtonProps) => {
  console.log("threadId", threadId);
  console.log("authorId", authorId);

  const tryReact = async () =>
    await userReaction({ userId: authorId, threadId });

  return (
    <>
      <Image
        src="/assets/heart-gray.svg"
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={tryReact}
      />
    </>
  );
};

export default ReactionButton;
