import { connectToDB } from "../mongoose";

import Reaction from "@/lib/models/reaction.model";

interface userReactionProps {
  userId: string;
  threadId: string;
}

export const userReaction = async ({
  userId,
  threadId,
}: userReactionProps) => {
  try {
    connectToDB();

    console.log("Logged in user: ", userId);
    console.log("Thread id: ", threadId);

    const existingReaction = await Reaction.findOne({
      user: userId,
      thread: threadId,
    });
    console.log("Existing reaction: ", existingReaction);
    if (existingReaction) {
      await existingReaction.deleteOne();
    } else {
      await Reaction.create({
        user: userId,
        thread: threadId,
      });
    }

    const newCount = await Reaction.countDocuments({
      thread: threadId,
    });
    console.log("New count: ", newCount);
    return newCount;
  } catch (error: any) {
    console.log(error.message);
  }
};
