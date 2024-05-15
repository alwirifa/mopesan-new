"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AdminData {
  id: number;
  name: string;
  email: string;
  permission: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
}

const Profile = ({ adminId }: { adminId: number }) => {
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem("admin_token"); 
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        setAdminData(response.data.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    if (adminId) {
      fetchAdminData();
    }
  }, [adminId]);

  if (!adminData) {
    return <div>Loading...</div>;
  }

  const logoutAction = () => {
    localStorage.removeItem("admin_token");
    router.push("/auth/login");
  };

  return (
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/icons/user.png"
            alt=""
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h1 className="text-xl font-semibold">{adminData.name}</h1>
            <p className="text-sm text-textGray">Admin</p>
          </div>
        </div>
        <button
          onClick={logoutAction}
          className="w-full py-3 border-2 border-primary rounded-md text-lg font-semibold text-primary "
        >
          Logout
        </button>
      </div>
  );
};

export default Profile;
