import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

import { fetchUser } from "@/lib/actions/users.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

import ThreadCard from "@/app/components/cards/ThreadCard";
import Comment from "@/app/components/forms/Comment";

const ThreadPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
        <Link href={`/thread/${thread._id}`}>
          <ThreadCard
            id={thread._id}
            currentUserId={user.id}
            parentId={thread.parentId}
            content={thread.text}
            author={thread.author}
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            editedAt={thread.editedAt}
          />
        </Link>
      </div>

      <div className="mt-7">
        <Comment
          threadId={params.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className="mt-10">
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            editedAt={childItem.editedAt}
            isComment
          />
        ))}
      </div>
    </section>
  );
};

export default ThreadPage;
