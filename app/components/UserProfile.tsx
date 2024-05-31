"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "../context/UserContext";

type Props = {};

const UserProfile: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const { ready, user, setUser } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth/login"); // Redirect to the login page or homepage
    setUser(null);
  };

  return (   
    <div>
      {/* <h1>Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre> */}

      <div className="w-full flex flex-col gap-6 ">
        <div className="flex items-center gap-4 px-2">
          <img
            src="/icons/user.png"
            alt=""
            className="h-16 w-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold">{user.role_name}</h1>
            <p className="text-sm text-textGray">{user.role_keyword}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-3 border-[3px] border-primary rounded-md text-lg font-semibold text-primary hover:bg-primary hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
