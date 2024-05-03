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
        const token = localStorage.getItem("admin_token"); // Mengambil token dari local storage
        if (!token) {
          throw new Error("No token found in local storage");
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/admins/${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Menggunakan token dari local storage
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
    router.push("/login");
  };

  return (
    <div>
      {/* <h1>Admin Profile</h1>
      <ul>
        <li>ID: {adminData.id}</li>
        <li>Name: {adminData.name}</li>
        <li>Email: {adminData.email}</li>
        <li>Permission: {adminData.permission}</li>
        <li>Active: {adminData.is_active ? "Yes" : "No"}</li>
        <li>Last Login: {new Date(adminData.last_login).toLocaleString()}</li>
        <li>Created At: {new Date(adminData.created_at).toLocaleString()}</li>
        <li>Updated At: {new Date(adminData.updated_at).toLocaleString()}</li>
      </ul> */}
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
          className="w-full py-3 border-2 border-bgRed rounded-md text-lg font-semibold text-textRed "
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
