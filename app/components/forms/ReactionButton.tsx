"use client";

import React, { useState } from "react"; // Import useState
import Image from "next/image";

import { userReaction } from "@/lib/actions/reaction.actions";

interface ReactionButtonProps {
  threadId: string;
  userId: string;
}

const ReactionButton = ({
  threadId,
  userId,
}: ReactionButtonProps) => {
  const [hasReacted, setHasReacted] = useState(false); // Initialize state

  const handleReaction = async () => {
    await userReaction({
      userId,
      threadId,
    });
    setHasReacted(true); // Update state when reaction is added
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
        onClick={handleReaction} // Use the updated handleReaction function
      />
    </>
  );
};

export default ReactionButton;
