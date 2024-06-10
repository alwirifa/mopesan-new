"use client";

import React, { useContext} from "react";
import Superadmin from "./superadmin/page";
import { UserContext } from "@/app/context/UserContext";
import Admin from "./admin/page";

const Page: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user?.role_keyword === "admin_merchant" ? (
     <Admin/>
      ) : (
        <Superadmin />
      )}
    </div>
  );
};

export default Page;
