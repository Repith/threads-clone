import { redirect } from "next/navigation";

import { fetchUserPosts } from "@/lib/actions/users.actions";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

import ThreadCard from "@/app/components/cards/ThreadCard";

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
  let result: any;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    // accountType === "User"
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => (
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
                  id: result.id,
                  image: result.image,
                }
              : {
                  name: thread.author.name,
                  id: thread.author.id,
                  image: thread.author.image,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
