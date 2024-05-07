"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type Admin = {
  id: number;
  name: string;
  email: string;
  permission: string;
  is_active: boolean;
  last_login: string;
  created_at: string;
  updated_at: string;
};

const Page: React.FC = () => {
  const router = useRouter();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [adminStatus, setAdminStatus] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/admins`
        );
        const { data } = response.data;
        console.log("Admins data:", data);

        // Convert last_login to the desired format
        const formattedAdmins = data.map((admin: Admin) => ({
          ...admin,
          last_login: formatDate(admin.last_login),
        }));

        setAdmins(formattedAdmins);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const addAdmin = () => {
    router.push("/dashboard/admin/add");
  };

  const formatDate = (dateString) => {
    // Ubah string tanggal ke objek Date
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format tanggal sesuai dengan "2 May 2024"
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };

  const dateString = "2024-05-02";
  console.log(formatDate(dateString));

  const changeAdminStatus = () => {
    setAdminStatus(!adminStatus);
  };

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-semibold">Admins</h1>
          <p>List of Admin</p>
        </div>
        <div>
          <button
            onClick={addAdmin}
            className="max-h-max px-6 py-4 bg-buttonRed text-textRed rounded-lg"
          >
            + Add Admin
          </button>
        </div>
      </div>

      <section className="flex gap-6">
        <div className="grid grid-cols-3 gap-4 w-full">
          {admins.length > 0 ? (
            admins.map((admin) => (
              <div
                key={admin.id}
                className="flex gap-6 justify-between p-4 items-center border rounded-lg bg-white"
              >
                <div>
                  <p className=" font-medium">{admin.email}</p>
                  <p className="text-sm text-textGray">
                    Last Login:{" "}
                    <span className="italic">{admin.last_login}</span>
                  </p>
                </div>
                <div>
                  {adminStatus ? (
                    <button
                      onClick={changeAdminStatus}
                      className="px-4 py-2 rounded-full bg-buttonGreen text-textGreen transition-all duration-300 ease-in-out "
                      style={{ width: adminStatus ? "8rem" : "10rem" }}
                    >
                      Active
                    </button>
                  ) : (
                    <button
                      onClick={changeAdminStatus}
                      className="px-4 py-2 rounded-full bg-buttonRed text-textRed transition-all duration-300 ease-in-out "
                      style={{ width: adminStatus ? "8rem" : "10rem" }}
                    >
                      Deactivated
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No admins available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Page;
