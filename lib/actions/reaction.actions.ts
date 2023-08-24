"use server";

import { connectToDB } from "@/lib/mongoose";

import Reaction from "@/lib/models/reaction.model";
import Thread from "@/lib/models/thread.model";

interface userReactionProps {
  userId: string;
  threadId: string;
}

export const userReaction = async ({
  userId,
  threadId,
}: userReactionProps) => {
  const user = JSON.parse(userId);
  const thread = JSON.parse(threadId);
  try {
    connectToDB();

    const existingReaction = await Reaction.find({
      user,
      thread,
    });

    if (existingReaction.length > 0) {
      await Reaction.deleteOne({
        user,
        thread,
      });

      await Thread.findOneAndUpdate(
        { _id: thread },
        { $pull: { reactions: existingReaction[0]._id } }
      );
    } else {
      const newReaction = await Reaction.create({
        user,
        thread,
      });

      await Thread.findOneAndUpdate(
        { _id: thread },
        { $push: { reactions: newReaction._id } }
      );
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const likesCount = async ({
  threadId,
}: userReactionProps) => {
  // const user = JSON.parse(userId);
  const thread = JSON.parse(threadId);

  try {
    connectToDB();
    await Reaction.countDocuments({ thread });
  } catch (error: any) {
    console.log(error.message);
  }
};
