import { redirect } from "next/navigation";

import { fetchUserPosts } from "@/lib/actions/users.actions";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

import ThreadCard from "@/app/components/cards/ThreadCard";

interface Result {
  name: string;
  image: string;
  id: string;
  username: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
      username: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    editedAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) => {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    // accountType === "User"
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? {
                  name: result.name,
                  image: result.image,
                  id: result.id,
                  username: result.username,
                }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                  username: thread.author.username,
                }
          }
          community={
            accountType === "Community"
              ? {
                  name: result.name,
                  id: result.id,
                  image: result.image,
                }
              : thread.community
          }
          createdAt={thread.createdAt}
          editedAt={thread.editedAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
