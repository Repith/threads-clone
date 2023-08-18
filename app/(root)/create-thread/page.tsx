import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/users.actions";
import PostThread from "@/app/components/forms/PostThread";

const CreateThread = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
};

export default CreateThread;
