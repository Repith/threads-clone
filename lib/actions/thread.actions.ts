"use server";

import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connect } from "http2";

interface createThreadParams {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export const createThread = async ({
  text,
  author,
  communityId,
  path,
}: createThreadParams) => {
  connectToDB();

  const createdThread = await Thread.create({
    text,
    author,
    community: null,
  });

  // Update user model
  await User.findByIdAndUpdate(author, {
    $push: { threads: createdThread._id },
  });

  // Instant update
  revalidatePath(path);
};

export const fetchPosts = async (
  pageNumber = 1,
  pageSize = 20
) => {
  connectToDB();

  // Calculate the number of posts to skip based on page number and page size
  const skipAmount = (pageNumber - 1) * pageSize;

  // Fetch the posts that have no parents (top-level threads - not a comment/reply)
  const postsQuery = Thread.find({
    parentId: { $in: [null, undefined] },
  })
    .sort({ createdAt: "desc" })
    .skip(skipAmount)
    .limit(pageSize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children", // Populate the children field
      populate: {
        path: "author", // Populate the author field within children
        model: User,
        select: "_id name parentId image", // Select only _id and username fields of the author
      },
    });

  // Total number of top-level threads
  const totalPostsCount = await Thread.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const posts = await postsQuery.exec();

  const isNext =
    totalPostsCount > skipAmount + posts.length;

  return { posts, isNext };
};

export const fetchThreadById = async (id: string) => {
  connectToDB();

  try {
    const thread = await Thread.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      })
      .exec();
    return thread;
  } catch (error: any) {
    throw new Error(
      `Error fetching thread: ${error.message}`
    );
  }
};

export const addCommentToThread = async (
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) => {
  connectToDB();

  try {
    // Find the original thread by ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create a new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    // Save the comment thread
    const savedCommentThread = await commentThread.save();

    // Update the original thread to include the comment thread
    originalThread.children.push(savedCommentThread._id);

    // Save the original thread
    await originalThread.save();
  } catch (error: any) {
    throw new Error(
      `Error adding comment to thread: ${error.message}`
    );
  }
};
