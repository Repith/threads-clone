import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import {
  fetchUser,
  fetchUsers,
} from "@/lib/actions/users.actions";

import UserCard from "@/app/components/cards/UserCard";

const SearchPage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    pageNumber: 1,
    pageSize: 25,
    searchString: "",
  });

  return (
    <section>
      {/* Search Bar */}
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((person) => (
              <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
