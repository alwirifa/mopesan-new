"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdmins } from "@/app/lib/actions/adminActions";

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
        const merchantsData = await getAdmins();
        setAdmins(merchantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => { };
  }, []);

  const addAdmin = () => {
    router.push("/dashboard/admin/add");
  };

  const formatDate = (dateString: string | number | Date) => {
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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">
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
                <Link
                    href={`/dashboard/admin/${admin.id}`}
                    className="px-8 py-2 rounded-md text-sm text-white bg-bgRed"
                  >
                    Details
                  </Link>
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
