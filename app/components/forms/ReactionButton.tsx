"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { userReaction } from "@/lib/actions/reaction.actions";

interface ReactionButtonProps {
  threadId: string;
  userId: string;
  isReacted?: boolean;
}

const ReactionButton = ({
  threadId,
  userId,
  isReacted,
}: ReactionButtonProps) => {
  const [hasReacted, setHasReacted] = useState(isReacted);

  const handleReaction = async () => {
    await userReaction({
      userId,
      threadId,
    });
    setHasReacted(!hasReacted);
  };

  return (
    <>
      <Image
        src={
          hasReacted
            ? "/assets/heart-filled.svg"
            : "/assets/heart-gray.svg"
        }
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={handleReaction}
      />
    </>
  );
};

export default ReactionButton;
